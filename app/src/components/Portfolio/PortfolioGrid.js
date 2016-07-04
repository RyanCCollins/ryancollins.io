import React, { PropTypes } from 'react';
import PortfolioItem from './PortfolioItem';
import { Column } from 'react-foundation';

const PortfolioGrid = ({
  projects,
  onLoad
}) => (
  <div className="portfolio-grid">
    <Column isColumn large={12} centerOnSmall>
      {projects.map((project) =>
        <PortfolioItem
          project={project}
          onLoad={onLoad}
          key={project.id}
        />
      )}
    </Column>
  </div>
);

PortfolioGrid.propTypes = {
  projects: PropTypes.array.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PortfolioGrid;
