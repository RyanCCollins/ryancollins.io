import React, { PropTypes } from 'react';
import {
  SingleProject,
  LoadingIndicator
} from '../../components';
import { connect } from 'react-redux';
import './SingleProjectContainer.scss';

class SingleProjectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setProject = this.setProject.bind(this);
    this.state = {
      selectedProject: null
    };
  }
  componentDidMount() {
    const {
      params,
      projects
    } = this.props;
    const projectId = parseInt(params.projectId, 10);
    const filteredProjects = projects.filter((item) =>
      item.id === projectId
    );
    this.setProject(filteredProjects[0]);
  }
  setProject(project) {
    this.setState({ selectedProject: project });
  }
  render() {
    const {
      selectedProject
    } = this.state;
    return (
      <div className="single-project-container">
        <LoadingIndicator isLoading={typeof selectedProject === 'undefined'}>
          {selectedProject &&
            <SingleProject
              {...this.props}
              project={this.state.selectedProject}
            />
          }
        </LoadingIndicator>
      </div>
    );
  }
}

SingleProjectContainer.propTypes = {
  projects: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  projects: state.portfolio.projects
});

export default connect(mapStateToProps)(SingleProjectContainer);
