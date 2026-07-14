import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const showcaseData = [
  {
    category: 'NFTs',
    projects: [
      {
        name: 'CryptoPunks',
        image: '/images/cryptopunks.jpg',
        description: 'One of the earliest and most popular NFT projects.',
        socials: {
          website: 'https://www.larvalabs.com/cryptopunks',
          twitter: 'https://twitter.com/cryptopunksnfts',
        },
        youtube: 'https://www.youtube.com/watch?v=example',
      },
      {
        name: 'Bored Ape Yacht Club',
        image: '/images/bayc.jpg',
        description: 'An exclusive NFT collection known for its community.',
        socials: {
          website: 'https://boredapeyachtclub.com/',
          twitter: 'https://twitter.com/BoredApeYC',
        },
        youtube: 'https://www.youtube.com/watch?v=example2',
      },
    ],
  },
  {
    category: 'AI Tokens',
    projects: [
      {
        name: 'SingularityNET',
        image: '/images/singularitynet.jpg',
        description: 'A decentralized AI marketplace.',
        socials: {
          website: 'https://singularitynet.io/',
          twitter: 'https://twitter.com/singularity_net',
        },
        youtube: 'https://www.youtube.com/watch?v=example3',
      },
    ],
  },
  {
    category: 'Crypto',
    projects: [
      {
        name: 'Cardano',
        image: '/images/bitcoin.jpg',
        description: 'The currency of the future.',
        socials: {
          website: 'https://bitcoin.org/',
          twitter: 'https://twitter.com/Bitcoin',
        },
        youtube: 'https://www.youtube.com/watch?v=example4',
      },
    ],
  },
  {
    category: 'Memecoins',
    projects: [
      {
        name: 'Dogecoin',
        image: '/images/dogecoin.jpg',
        description: 'A fun and friendly internet currency.',
        socials: {
          website: 'https://dogecoin.com/',
          twitter: 'https://twitter.com/dogecoin',
        },
        youtube: 'https://www.youtube.com/watch?v=example5',
      },
    ],
  },
];

const Card = ({ project, onClick }) => (
  <motion.div
    className="project-card neumorphic-card"
    onClick={() => onClick(project)}
    whileHover={{ scale: 1.05 }}
  >
    <img src={project.image} alt={project.name} className="project-image" />
    <h4>{project.name}</h4>
  </motion.div>
);

export default function InvestmentShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  const fadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <section className="showcase-section">
      <div className="showcase-grid">
        {/* Left Column: Categories */}
        <div className="categories-column">
          {showcaseData.map((category) => (
            <div
              key={category.category}
              className={`category-card ${selectedCategory?.category === category.category ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category);
                setExpandedProject(null);
              }}
            >
              <h3>{category.category}</h3>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="content-column">
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                key={selectedCategory.category}
                className="carousel"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {expandedProject ? (
                  <motion.div
                    className="expanded-card neumorphic-card"
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <img src={expandedProject.image} alt={expandedProject.name} />
                    <h3>{expandedProject.name}</h3>
                    <p>{expandedProject.description}</p>
                    <div className="links">
                      <a href={expandedProject.socials.website} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                      <a href={expandedProject.socials.twitter} target="_blank" rel="noopener noreferrer">
                        Twitter
                      </a>
                      <a href={expandedProject.youtube} target="_blank" rel="noopener noreferrer">
                        YouTube
                      </a>
                    </div>
                    <button onClick={() => setExpandedProject(null)}>Back</button>
                  </motion.div>
                ) : (
                  selectedCategory.projects.map((project) => (
                    <Card key={project.name} project={project} onClick={setExpandedProject} />
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

