export class OrganellePhysicsManager {
  constructor(containerWidth = 800, containerHeight = 600, isMobile = false, organelleRadius = 90) {
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.isMobile = isMobile;
    this.organelles = [];
    this.isRunning = false;
    this.animationFrame = null;

    // Physics constants - faster and more responsive
    this.damping = 0.995;
    this.bounceStrength = 0.8;
    this.minSpeed = 2.0; // Increased to ensure organelles never appear stationary
    this.maxSpeed = 3.5; // Faster maximum speed
    this.organelleRadius = organelleRadius; // Passed from parent (35 on mobile, 90 on desktop)
    this.separationForce = 0.3;

    // Collision tracking for membrane reactions
    this.recentCollisions = [];

    // Breathing force tracking (desktop only)
    this.breathingForceStrength = 0.15; // Subtle pull strength
    this.currentBreathingVelocity = 0; // Track rate of radius change

    if (isMobile) {
      // Mobile: Rounded square boundaries (85% of viewBox = 85% of container)
      const squarePercent = 0.85;
      const halfWidth = (containerWidth * squarePercent) / 2;
      const halfHeight = (containerHeight * squarePercent) / 2;

      this.rectLeft = -halfWidth;
      this.rectRight = halfWidth;
      this.rectTop = -halfHeight;
      this.rectBottom = halfHeight;
      this.rectBorderRadius = Math.min(halfWidth, halfHeight) * 0.15; // 15% border radius
    } else {
      // Desktop: Dynamic circle boundary (tracks breathing membrane)
      this.ellipseX = 0;
      this.ellipseY = 0;
      // Initialize with minimum breathing size (37 in viewBox units)
      // Will be updated dynamically as membrane breathes
      this.ellipseRadiusX = containerWidth * 0.37; // Dynamic: starts at 37 viewBox units
      this.ellipseRadiusY = containerHeight * 0.37; // Perfect circle: equal to radiusX
      this.currentMembraneRadius = 37; // Track current membrane radius for dynamic updates
    }
  }

  addOrganelle(id, startX = 0, startY = 0) {
    let x, y;

    if (this.isMobile) {
      // Generate random starting position inside rounded square
      // Stay away from edges by using 70% of available space
      const safeMargin = 0.7;
      const xRange = (this.rectRight - this.rectLeft) * safeMargin;
      const yRange = (this.rectBottom - this.rectTop) * safeMargin;

      x = (Math.random() - 0.5) * xRange;
      y = (Math.random() - 0.5) * yRange;
    } else {
      // Generate random starting position inside ellipse
      const baseAngle = (this.organelles.length / 6) * Math.PI * 2;
      const angleVariation = (Math.random() - 0.5) * Math.PI; // ±90° variation
      const angle = baseAngle + angleVariation;

      const radiusVariation = 0.2 + Math.random() * 0.4; // 20% to 60% of ellipse radius
      x = Math.cos(angle) * this.ellipseRadiusX * radiusVariation;
      y = Math.sin(angle) * this.ellipseRadiusY * radiusVariation;
    }

    // Generate random velocity direction
    const velAngle = Math.random() * Math.PI * 2; // Random direction
    const speedVariation = 1.5 + Math.random() * 1.0; // Speed between 1.5-2.5
    const velX = Math.cos(velAngle) * speedVariation;
    const velY = Math.sin(velAngle) * speedVariation;

    const organelle = {
      id,
      x,
      y,
      velX,
      velY,
      radius: this.organelleRadius
    };

    this.organelles.push(organelle);
    return organelle;
  }

  removeOrganelle(id) {
    this.organelles = this.organelles.filter(org => org.id !== id);
  }

  getOrganelle(id) {
    return this.organelles.find(org => org.id === id);
  }

  // Check if point is inside ellipse boundary
  isInsideEllipse(x, y, margin = 0) {
    const normalizedX = x / (this.ellipseRadiusX - margin);
    const normalizedY = y / (this.ellipseRadiusY - margin);
    return (normalizedX * normalizedX + normalizedY * normalizedY) <= 1;
  }

  // Handle rounded square boundary collision (mobile)
  handleRoundedSquareBoundary(organelle) {
    const margin = organelle.radius;
    const left = this.rectLeft + margin;
    const right = this.rectRight - margin;
    const top = this.rectTop + margin;
    const bottom = this.rectBottom - margin;
    const cornerRadius = this.rectBorderRadius;

    let reflected = false;

    // Check if in corner regions
    const inLeftCorner = organelle.x < left + cornerRadius;
    const inRightCorner = organelle.x > right - cornerRadius;
    const inTopCorner = organelle.y < top + cornerRadius;
    const inBottomCorner = organelle.y > bottom - cornerRadius;

    // Handle corners (circular collision with corner centers)
    if ((inLeftCorner && inTopCorner) || (inLeftCorner && inBottomCorner) ||
        (inRightCorner && inTopCorner) || (inRightCorner && inBottomCorner)) {

      // Find corner center
      let cornerX, cornerY;
      if (inLeftCorner && inTopCorner) {
        cornerX = left + cornerRadius;
        cornerY = top + cornerRadius;
      } else if (inLeftCorner && inBottomCorner) {
        cornerX = left + cornerRadius;
        cornerY = bottom - cornerRadius;
      } else if (inRightCorner && inTopCorner) {
        cornerX = right - cornerRadius;
        cornerY = top + cornerRadius;
      } else {
        cornerX = right - cornerRadius;
        cornerY = bottom - cornerRadius;
      }

      const dx = organelle.x - cornerX;
      const dy = organelle.y - cornerY;
      const distFromCorner = Math.sqrt(dx * dx + dy * dy);

      if (distFromCorner > cornerRadius) {
        // Push back toward corner center
        const pushBackDist = distFromCorner - cornerRadius;
        const nx = dx / distFromCorner;
        const ny = dy / distFromCorner;

        organelle.x -= nx * pushBackDist;
        organelle.y -= ny * pushBackDist;

        // Reflect velocity
        const dot = organelle.velX * nx + organelle.velY * ny;
        organelle.velX -= 2 * dot * nx * this.bounceStrength;
        organelle.velY -= 2 * dot * ny * this.bounceStrength;
        reflected = true;
      }
    }

    // Handle straight edges (if not already reflected by corner)
    if (!reflected) {
      // Left edge
      if (organelle.x < left) {
        organelle.x = left;
        organelle.velX = Math.abs(organelle.velX) * this.bounceStrength;
      }
      // Right edge
      if (organelle.x > right) {
        organelle.x = right;
        organelle.velX = -Math.abs(organelle.velX) * this.bounceStrength;
      }
      // Top edge
      if (organelle.y < top) {
        organelle.y = top;
        organelle.velY = Math.abs(organelle.velY) * this.bounceStrength;
      }
      // Bottom edge
      if (organelle.y > bottom) {
        organelle.y = bottom;
        organelle.velY = -Math.abs(organelle.velY) * this.bounceStrength;
      }
    }
  }

  // Handle ellipse boundary collision with less orbital behavior
  handleEllipseBoundary(organelle) {
    const margin = organelle.radius;
    let effectiveRadiusX = this.ellipseRadiusX - margin;
    let effectiveRadiusY = this.ellipseRadiusY - margin;

    // Quadrant-specific adjustment to fix Bezier overshoot in right quadrants
    // The SVG Bezier curves bulge outward more on the right side due to
    // non-uniform stretching from preserveAspectRatio="none"
    const angle = Math.atan2(organelle.y, organelle.x);
    const isRightQuadrant = Math.abs(angle) < Math.PI / 2; // Between -90° and +90° (right side)

    if (isRightQuadrant) {
      // Apply tighter boundary on right side to compensate for Bezier bulge
      // Bottom-right is most affected, so use distance from horizontal axis to scale the adjustment
      const angleFromHorizontal = Math.abs(angle); // 0 at right center, π/2 at top/bottom
      const adjustmentFactor = 1 - (angleFromHorizontal / (Math.PI / 2)) * 0.02; // 0-2% tighter
      effectiveRadiusX *= (0.97 + adjustmentFactor * 0.03); // 97-100% of original (tightest at horizontal)
    }

    const normalizedX = organelle.x / effectiveRadiusX;
    const normalizedY = organelle.y / effectiveRadiusY;
    const distance = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);

    if (distance >= 1) {
      // Push back inside consistently
      const pushBackFactor = 0.95;
      organelle.x = (normalizedX / distance) * effectiveRadiusX * pushBackFactor;
      organelle.y = (normalizedY / distance) * effectiveRadiusY * pushBackFactor;

      // Calculate surface normal
      const normalX = (2 * organelle.x / (effectiveRadiusX * effectiveRadiusX));
      const normalY = (2 * organelle.y / (effectiveRadiusY * effectiveRadiusY));
      const normalLength = Math.sqrt(normalX * normalX + normalY * normalY);

      if (normalLength > 0) {
        const nx = normalX / normalLength;
        const ny = normalY / normalLength;

        // Simple, predictable reflection
        const dot = organelle.velX * nx + organelle.velY * ny;
        organelle.velX -= 2 * dot * nx * this.bounceStrength;
        organelle.velY -= 2 * dot * ny * this.bounceStrength;

        // Record collision for membrane reaction
        const impactForce = Math.abs(dot);
        this.recentCollisions.push({
          x: organelle.x,
          y: organelle.y,
          timestamp: Date.now(),
          force: impactForce * 2.5 // Amplify for more visible effect
        });

        // Clear old collisions (> 600ms for longer visible effect)
        this.recentCollisions = this.recentCollisions.filter(
          c => Date.now() - c.timestamp < 600
        );
      }
    }
  }

  // Handle organelle-to-organelle collision with proper physics
  handleOrganelleCollisions() {
    for (let i = 0; i < this.organelles.length; i++) {
      for (let j = i + 1; j < this.organelles.length; j++) {
        const org1 = this.organelles[i];
        const org2 = this.organelles[j];
        
        const dx = org1.x - org2.x;
        const dy = org1.y - org2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = org1.radius + org2.radius;
        
        if (distance < minDistance && distance > 1) { // Avoid division by zero
          // Normalize collision vector
          const nx = dx / distance;
          const ny = dy / distance;
          
          // Aggressive separation to prevent sticking
          const overlap = minDistance - distance;
          const separationDistance = overlap / 2 + 5; // Extra 5px separation
          
          org1.x += nx * separationDistance;
          org1.y += ny * separationDistance;
          org2.x -= nx * separationDistance;
          org2.y -= ny * separationDistance;
          
          // Calculate relative velocity along collision normal
          const relativeVelX = org1.velX - org2.velX;
          const relativeVelY = org1.velY - org2.velY;
          const velAlongNormal = relativeVelX * nx + relativeVelY * ny;
          
          // Don't resolve if velocities are separating
          if (velAlongNormal > 0) continue;
          
          // Elastic collision with restitution
          const restitution = 0.9; // Bouncy collision
          const impulse = -(1 + restitution) * velAlongNormal;
          
          // Apply impulse to separate them cleanly
          const impulseStrength = impulse * 0.5; // Equal mass assumption
          
          org1.velX += impulseStrength * nx;
          org1.velY += impulseStrength * ny;
          org2.velX -= impulseStrength * nx;
          org2.velY -= impulseStrength * ny;
          
          // Add minimum separation velocity to ensure they move apart
          const minSeparationSpeed = 1.0;
          org1.velX += nx * minSeparationSpeed;
          org1.velY += ny * minSeparationSpeed;
          org2.velX -= nx * minSeparationSpeed;
          org2.velY -= ny * minSeparationSpeed;
        }
      }
    }
  }

  // Set hover state for organelle (slows it down)
  setHoverState(id, isHovered) {
    const organelle = this.getOrganelle(id);
    if (organelle) {
      organelle.isHovered = isHovered;
    }
  }

  // Set expanded state for organelle (Option 3: grows in place, pushes others away)
  setExpandedState(id, isExpanded, expandedScale = 2.5) {
    const organelle = this.getOrganelle(id);
    if (!organelle) return;

    organelle.isExpanded = isExpanded;

    if (isExpanded) {
      // Store original radius and set expanded radius
      organelle.originalRadius = organelle.radius;
      organelle.radius = organelle.originalRadius * expandedScale;

      // Push other organelles away from this one
      this.pushOrganellesAway(id, organelle.radius);
    } else {
      // Restore original radius
      if (organelle.originalRadius) {
        organelle.radius = organelle.originalRadius;
        delete organelle.originalRadius;
      }
    }
  }

  // Push all other organelles away from the expanded one
  pushOrganellesAway(expandedId, expandedRadius) {
    const expandedOrg = this.getOrganelle(expandedId);
    if (!expandedOrg) return;

    for (const org of this.organelles) {
      if (org.id === expandedId) continue; // Skip the expanded one

      const dx = org.x - expandedOrg.x;
      const dy = org.y - expandedOrg.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = expandedRadius + org.radius;

      if (distance < minDistance) {
        // Push away from expanded organelle
        const pushDistance = minDistance - distance + 10; // Extra 10px separation
        const nx = distance > 0 ? dx / distance : 1;
        const ny = distance > 0 ? dy / distance : 0;

        org.x += nx * pushDistance;
        org.y += ny * pushDistance;

        // Add outward velocity to continue moving away
        const pushForce = 5.0;
        org.velX += nx * pushForce;
        org.velY += ny * pushForce;
      }
    }
  }

  // Update physics for one frame
  update() {
    // Apply breathing force to all organelles (desktop only)
    if (!this.isMobile && this.currentBreathingVelocity !== 0) {
      for (const organelle of this.organelles) {
        if (organelle.isExpanded) continue; // Skip expanded organelles

        // Calculate radial direction from center to organelle
        const distanceFromCenter = Math.sqrt(organelle.x * organelle.x + organelle.y * organelle.y);

        if (distanceFromCenter > 1) { // Avoid division by zero
          const radialDirectionX = organelle.x / distanceFromCenter;
          const radialDirectionY = organelle.y / distanceFromCenter;

          // Apply force proportional to breathing velocity
          // Positive velocity = expanding (push outward)
          // Negative velocity = contracting (pull inward)
          const force = this.currentBreathingVelocity * this.breathingForceStrength;

          organelle.velX += radialDirectionX * force;
          organelle.velY += radialDirectionY * force;
        }
      }
    }

    for (const organelle of this.organelles) {
      // Expanded organelles don't move (Option 3: they stay in place)
      if (organelle.isExpanded) {
        organelle.velX = 0;
        organelle.velY = 0;
        continue;
      }

      // Apply movement with hover slowdown
      const speedMultiplier = organelle.isHovered ? 0.1 : 1.0;
      organelle.x += organelle.velX * speedMultiplier;
      organelle.y += organelle.velY * speedMultiplier;

      // Apply damping
      organelle.velX *= this.damping;
      organelle.velY *= this.damping;

      // Add subtle random perturbations to prevent equilibrium orbits
      // This keeps organelles exploring the space instead of settling into stable patterns
      if (Math.random() < 0.02) { // 2% chance each frame (~1-2 times per second at 60fps)
        const perturbStrength = 0.3; // Gentle nudge
        const perturbAngle = Math.random() * Math.PI * 2;
        organelle.velX += Math.cos(perturbAngle) * perturbStrength;
        organelle.velY += Math.sin(perturbAngle) * perturbStrength;
      }

      // Maintain healthy motion without spikes
      const speed = Math.sqrt(organelle.velX * organelle.velX + organelle.velY * organelle.velY);
      if (speed < 0.0001) {
        // Generate a fresh direction when movement has essentially stopped
        const angle = Math.random() * Math.PI * 2;
        organelle.velX = Math.cos(angle) * this.minSpeed;
        organelle.velY = Math.sin(angle) * this.minSpeed;
      } else if (speed < this.minSpeed) {
        const factor = this.minSpeed / speed;
        organelle.velX *= factor;
        organelle.velY *= factor;
      }

      // Limit maximum speed
      if (speed > this.maxSpeed) {
        const factor = this.maxSpeed / speed;
        organelle.velX *= factor;
        organelle.velY *= factor;
      }
    }
    
    // Handle collisions
    this.handleOrganelleCollisions();

    // Handle boundary collisions (use appropriate handler based on mobile/desktop)
    for (const organelle of this.organelles) {
      if (this.isMobile) {
        this.handleRoundedSquareBoundary(organelle);
      } else {
        this.handleEllipseBoundary(organelle);
      }
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    const loop = () => {
      if (!this.isRunning) return;
      
      this.update();
      this.animationFrame = requestAnimationFrame(loop);
    };
    
    this.animationFrame = requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  // Get positions in display coordinates (physics coordinates are centered)
  getDisplayPositions() {
    const displayPositions = {};
    
    for (const organelle of this.organelles) {
      displayPositions[organelle.id] = {
        x: organelle.x,
        y: organelle.y
      };
    }
    
    return displayPositions;
  }

  // Update container dimensions (for window resize)
  updateDimensions(newWidth, newHeight) {
    this.containerWidth = newWidth;
    this.containerHeight = newHeight;

    // Update circle dimensions (keep as perfect circle, use current membrane radius)
    const radiusRatio = this.currentMembraneRadius / 100; // Convert viewBox units to ratio
    this.ellipseRadiusX = newWidth * radiusRatio;
    this.ellipseRadiusY = newHeight * radiusRatio;
  }

  // Update dynamic membrane boundary (called each frame as membrane breathes)
  updateMembraneBoundary(membraneRadiusInViewBox) {
    if (!this.isMobile) {
      // Calculate breathing velocity (rate of change in radius)
      const previousRadius = this.currentMembraneRadius || membraneRadiusInViewBox;
      const radiusChange = membraneRadiusInViewBox - previousRadius;
      this.currentBreathingVelocity = radiusChange;

      this.currentMembraneRadius = membraneRadiusInViewBox;
      // Convert viewBox radius (0-100 scale) to actual container pixels
      const radiusRatio = membraneRadiusInViewBox / 100;
      this.ellipseRadiusX = this.containerWidth * radiusRatio;
      this.ellipseRadiusY = this.containerHeight * radiusRatio;
    }
  }

  // Get recent collisions for membrane reactions
  getRecentCollisions() {
    return this.recentCollisions;
  }
}
