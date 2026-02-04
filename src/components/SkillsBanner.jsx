import "../styles/SkillsBanner.css";
import ParticleCanvas from "./ParticleCanvas";

const SkillsBanner = () => {
  // Skills organized by category - all white text on black background
  const skills = [
    // Genetic Counseling
    { name: "Genetic Counseling", category: "counseling" },
    { name: "Clinical Genetics", category: "counseling" },
    { name: "Variant Interpretation", category: "counseling" },
    { name: "Patient Communication", category: "counseling" },

    // Programming
    { name: "R", category: "programming" },
    { name: "Python", category: "programming" },
    { name: "JavaScript", category: "programming" },
    { name: "React", category: "programming" },
    { name: "Three.js", category: "programming" },

    // Statistics
    { name: "Statistical Genomics", category: "statistics" },
    { name: "Bioinformatics", category: "statistics" },
    { name: "Data Analysis", category: "statistics" },
    { name: "Biostatistics", category: "statistics" },

    // Research
    { name: "Melanoma Research", category: "research" },
    { name: "Genomic Medicine", category: "research" },
    { name: "Clinical Research", category: "research" },
    { name: "Data Visualization", category: "research" },
  ];

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="skills-banner-wrapper">
      {/* Left particle zone - decomposition (extends beyond tube) */}
      <ParticleCanvas side="left" width={300} height={80} />

      {/* Center solid glass tube - terminal banner (84vw, matches sections) */}
      <div className="skills-banner-tube">
        <div className="skills-banner-track">
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="skill-pill"
            >
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right particle zone - integration (extends beyond tube) */}
      <ParticleCanvas side="right" width={300} height={80} />
    </div>
  );
};

export default SkillsBanner;
