import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import OrganelleNew from "./OrganelleNew";
import OrganicBlob from "./OrganicBlob";
import { OrganellePhysicsManager } from "./OrganellePhysics";
import "../../Styles/Work.css";

const ORGANELLE_DESKTOP_SIZE = 170;
const ORGANELLE_MOBILE_SIZE = 70;

const workItems = [
  {
    title: "Melanoma Genetics Workshop",
    description:
      "Interactive evaluation analysing dermatologists' genetics training outcomes.",
    technologies: "React, R, Statistical Analysis",
    role: "Research Data Scientist",
    link: "/projects/melanoma-workshop",
    icon: "🎓",
    organelleType: "education",
    fontStyle: "creative",
    comingSoon: true,
  },
  {
    title: "Hearing Loss & Gestational Diabetes Study",
    description:
      "Neonatal screening insights from 328,751 births connecting GDM and congenital hearing loss.",
    technologies: "React, D3.js, Statistical Analysis",
    role: "Research Data Scientist",
    link: "/projects/hearing-loss-diabetes",
    icon: "📊",
    organelleType: "research",
    fontStyle: "technical",
    comingSoon: false,
  },
  {
    title: "Automated PRS Booklet Tool",
    description:
      "Generates personalised melanoma PRS dossiers for clinics in one command.",
    technologies: "Python, LaTeX",
    role: "Automation Engineer",
    link: "/work/prs-generator",
    icon: "⚙️",
    organelleType: "automation",
    fontStyle: "technical",
    comingSoon: true,
  },
  {
    title: "Clinical Calculator for DermClinic",
    description:
      "Point-of-care dermato-oncology dose calculator deployed to multidisciplinary teams.",
    technologies: "React, Node",
    role: "Frontend Developer",
    link: "/work/dermcalc",
    icon: "🧰",
    organelleType: "clinical",
    fontStyle: "technical",
    comingSoon: true,
  },
];

export default function WorkSection() {
  const containerRef = useRef(null);
  const physicsManagerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [organellePositions, setOrganellePositions] = useState({});

  const activeOrganelleId =
    activeIndex != null ? `organelle-${activeIndex}` : null;

  useEffect(() => {
    const updateBreakpoint = () => setIsMobile(window.innerWidth <= 768);
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientWidth, clientHeight } = container;
    const organelleRadius =
      (isMobile ? ORGANELLE_MOBILE_SIZE : ORGANELLE_DESKTOP_SIZE) / 2;

    const manager = new OrganellePhysicsManager(
      clientWidth,
      clientHeight,
      isMobile,
      organelleRadius
    );
    physicsManagerRef.current = manager;

    workItems.forEach((_, index) =>
      manager.addOrganelle(`organelle-${index}`)
    );

    manager.start();

    const syncState = () => {
      const currentManager = physicsManagerRef.current;
      if (!currentManager) return;

      setOrganellePositions(currentManager.getDisplayPositions());
      animationFrameRef.current = requestAnimationFrame(syncState);
    };

    animationFrameRef.current = requestAnimationFrame(syncState);

    resizeObserverRef.current = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      physicsManagerRef.current?.updateDimensions(width, height);
    });
    resizeObserverRef.current.observe(container);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      physicsManagerRef.current?.stop();
      physicsManagerRef.current = null;
    };
  }, [isMobile]);

  const closeActiveOrganelle = useCallback(() => {
    if (activeOrganelleId) {
      physicsManagerRef.current?.setExpandedState(activeOrganelleId, false);
    }
    setActiveIndex(null);
  }, [activeOrganelleId]);

  useEffect(() => {
    if (activeOrganelleId == null) return;

    const handlePointerDown = (event) => {
      if (event.target.closest(".organelle")) return;
      closeActiveOrganelle();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [activeOrganelleId, closeActiveOrganelle]);

  const handleOpen = (index) => {
    const id = `organelle-${index}`;
    setActiveIndex(index);
    physicsManagerRef.current?.setExpandedState(
      id,
      true,
      isMobile ? 2.2 : 2.5
    );
  };

  const handleClose = () => {
    closeActiveOrganelle();
  };

  const handleHoverChange = (id, isHovered) => {
    setHoveredId(isHovered ? id : null);
    physicsManagerRef.current?.setHoverState(id, isHovered);
  };

  // Handle membrane radius changes from OrganicBlob breathing animation
  const handleMembraneRadiusChange = useCallback((radiusInViewBox) => {
    if (physicsManagerRef.current) {
      physicsManagerRef.current.updateMembraneBoundary(radiusInViewBox);
    }
  }, []);

  return (
    <section
      id="work"
      className="screen-section work-wrapper"
      data-section="Interactive Laboratory"
    >
      <div className="work-content-grid">
        <div
          ref={containerRef}
          className={`work-cell${activeOrganelleId ? " skills-active" : ""}`}
        >
          <OrganicBlob
            isMobile={isMobile}
            onMembraneRadiusChange={handleMembraneRadiusChange}
          >
            {workItems.map((item, index) => {
              const organelleId = `organelle-${index}`;
              const position =
                organellePositions[organelleId] || { x: 0, y: 0 };

              return (
                <OrganelleNew
                  key={organelleId}
                  id={organelleId}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  link={item.link}
                  technologies={item.technologies}
                  role={item.role}
                  organelleType={item.organelleType}
                  fontStyle={item.fontStyle}
                  position={position}
                  active={activeIndex === index}
                  dimmed={activeIndex !== null && activeIndex !== index}
                  hovered={hoveredId === organelleId}
                  onOpen={() => handleOpen(index)}
                  onClose={handleClose}
                  onHoverStart={() => handleHoverChange(organelleId, true)}
                  onHoverEnd={() => handleHoverChange(organelleId, false)}
                  isMobile={isMobile}
                  size={isMobile ? ORGANELLE_MOBILE_SIZE : ORGANELLE_DESKTOP_SIZE}
                  comingSoon={item.comingSoon}
                />
              );
            })}
          </OrganicBlob>
        </div>

        <motion.div
          className="work-sidebar"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="work-sidebar-title">Interactive Laboratory</h2>
          <p className="work-sidebar-subtitle">
            Projects circulating through my scientific practice
          </p>
          <p className="work-sidebar-description">
            Dive into my interactive laboratory, where each 'organelle' represents a
            real-world project. These are systems I've engineered, ranging from
            interactive statistical reports for biotech teams and clinical
            counseling tools, to automation pipelines for genomic data. Explore
            each structure to see how I bridge complex biological insights with
            practical data science solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
