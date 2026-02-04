# Development Log - January 16, 2026

## Progress: FoxP2 (2A07) Protein Visualization

### Phase: Mol* & Blender Preparation
- **PDB ID:** `2A07` (FoxP2 Forkhead domain bound to DNA).
- **Status:** GLB model exported from Mol* and undergoing Blender cleanup.
- **Components Created:**
    - `Struct_Helix`: Cartoon representation of alpha-helices (includes the key Helix 3).
    - `Struct_Sheet`: Cartoon representation of beta-sheets (the "wings").
    - `Protein`: Full cartoon representation for secondary structure connectors.
    - `Struct_DNA`: Cartoon representation of the double helix.
    - `Mutation_R553`: Ball & Stick representation of the critical Arg 553 (speech-language mutation site).
    - `Interaction_Interface`: Ball & Stick representation of curated binding residues (N550, R553, H554). *Note: R564 was considered but found to be distally positioned in this specific PDB frame.*
    - `Mol_Surface`: Gaussian surface with intended opacity of 0.3.

### Scientific Context (The "Story")
- **The "Reading" Mechanism:** N550 and H554 in Helix 3 scan the major groove for the `TRAC` sequence.
- **The "Stabilizer":** R553 locks the protein into the DNA. Its mutation (R553H) is the primary cause of FOXP2-related speech-language disorder.
- **The "Wing":** The sheets/loops provide secondary stability (the "winged-helix" motif).

### Next Steps (Post-Restart)
1.  **Blender Finalization:** 
    - Parent to `Protein_Root`.
    - Center at `(0,0,0)`.
    - Apply `-90` X-rotation.
    - Export as `foxp2.glb` with Draco compression to `src/assets/`.
2.  **React Implementation:**
    - Update `AcademicJourney.jsx` to include FoxP2 entry.
    - Update `ProteinViewer.jsx` to handle `Struct_DNA` and specialized interaction highlights.
    - Configure camera/zoom levels for optimal viewing of the DNA-Protein interface.

---
*Note: Restarting system for environment stability. Continuing from Blender Cleanup.*

# Development Log - January 17, 2026

## Pivot: Molecular Nodes Workflow
- **Issue Identified:** Importing generic meshes from Mol* resulted in a "soup of meshes" (separate backbones, nucleotides, subunits) that was difficult to manage and animate programmatically.
- **Solution:** Transitioned to using the **Molecular Nodes** Blender add-on.
    - Allows direct import of `.bcif` / `.mmCIF` files.
    - Preserves semantic data (Chains, Residue IDs).
    - Uses Geometry Nodes for procedural selection and styling.
- **Workflow Established:**
    1.  Import `2A07.bcif` via Molecular Nodes.
    2.  Use `Separate Geometry` nodes to isolate functional components (`Chain_A`, `Chain_B`, `Struct_DNA`, `Mutation_R553`).
    3.  Apply styles (Cartoon/Ribbon) within Blender before export.
- **Documentation:** Created `guides/MOLECULAR_NODES_WORKFLOW.md` to serve as the standard operating procedure for all future protein models.

## Codebase Updates
- **`ProteinViewer.jsx`**:
    - Added structure definitions for `Struct_DNA`, `Mutation_R553`, and `Interaction_Interface`.
    - Defined color schemes (Neon Violet for DNA, Red for Mutation) to support the new FOXP2 assets.