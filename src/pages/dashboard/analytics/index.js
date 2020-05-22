import React from 'react'
import { Helmet } from 'react-helmet'
import ButtonMethod from 'components/widgets/Buttons/Method'

class DashboardAnalytics extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
        <div className="air__utils__heading">
          <h5>Create New Projects</h5>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-6">
            <div className="row">
              {/* Custom Project */}
              <ButtonMethod
                projectName="New Custom Project"
                projectImage="resources/images/projects/new-project.png"
                methodName="Create a New Custom labeling project"
              />
              {/* End Custom Project */}

              <ButtonMethod
                projectName="New RB Project"
                projectImage="resources/images/projects/rb-project.png"
                methodName="Create a Rule Based labeling project."
              />

              {/* Hidden Markov Model Project */}
              <ButtonMethod
                projectName="New HMM Project"
                projectImage="resources/images/projects/hmm-project.png"
                methodName="Create a Hidden Markov Model labeling project."
              />
              {/* End Hidden Markov Model Project */}

              {/* Conditional Random Field Project */}
              <ButtonMethod
                projectName="New CFF Project"
                projectImage="resources/images/projects/crf-project.png"
                methodName="Create a Facial Feature Extraction labeling project."
              />
              {/* End Conditional Random Field Project */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardAnalytics
