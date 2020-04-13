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
              <div className="col-xl-4 col-lg-12">
                <div className="card bg-gray-1 border-blue">
                  <div className="card-body">
                    <ButtonMethod
                      projectName="New Custom Project"
                      projectImage="resources/images/projects/new-project.png"
                      methodName="Create a New Custom labeling project"
                    />
                  </div>
                </div>
              </div>
              {/* End Custom Project */}

              {/* Rule Based Project */}
              <div className="col-xl-4 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <ButtonMethod
                      projectName="New RB Project"
                      projectImage="resources/images/projects/rb-project.png"
                      methodName="Create a Rule Based labeling project."
                    />
                  </div>
                </div>
              </div>
              {/* End Rule Based Project */}

              {/* Conditional Random Field Project */}
              <div className="col-xl-4 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <ButtonMethod
                      projectName="New CFF Project"
                      projectImage="resources/images/projects/crf-project.png"
                      methodName="Create a Facial Feature Extraction labeling project."
                    />
                  </div>
                </div>
              </div>
              {/* End Conditional Random Field Project */}

              {/* Hidden Markov Model Project */}
              <div className="col-xl-4 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <ButtonMethod
                      projectName="New HMM Project"
                      projectImage="resources/images/projects/hmm-project.png"
                      methodName="Create a Hidden Markov Model labeling project."
                    />
                  </div>
                </div>
              </div>
              {/* End Hidden Markov Model Project */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardAnalytics
