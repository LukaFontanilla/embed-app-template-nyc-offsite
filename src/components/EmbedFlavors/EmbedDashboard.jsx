import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'

/**
 * Day 1 Challenge 5: JS Events - Filters
 * 
 * Task steps:
 * - Navigate to Step 1
 * - uncomment filterName, filterOptions, initialFilter, filter / setFilter, and useEffect
 * - fill in values for filterName, filterOptions, intialFilter
 * - complete the useEffect by adding the correct functions to each "dashboard" line. 
 *    Hint, there are two steps for syncing filters from outside iframe with the dashboard and running the dashboard
 * - Navigate to Step 2
 * - Make sure if the filters in the Looker UI change the external filters update
 */

const EmbedDashboard = ({id, dashboard,setDashboard, tab}) => {
  const navigate = useNavigate()
  const [dashboardStatus, setDashboardStatus] = useState('Loading...')
  
  // STEP 1

  // START
  // const filterName = 
  // const filterOptions = []
  // const initialFilter = 
  // const [filter, setFilter] = useState(initialFilter)

  // useEffect(() => {
  //   if(dashboard) {
  //     dashboard.
  //     dashboard.
  //   }
  // },[dashboard])

  // END

  const onDashboardSetup = (d) => {
    setDashboard(d)
  }

  const setupDashboard = useCallback(
    (div) => {
      if (!div) {
        return
      }
      div.innerHTML = "";
      LookerEmbedSDK.createDashboardWithId(id)
        .withAllowAttr('fullscreen')
        .appendTo(div)

        // Listen to messages to display progress
        .on('dashboard:loaded', () => setDashboardStatus('Loaded'))
        .on('dashboard:run:start', (e) => {
          setDashboardStatus('Running')
        })
        .on('dashboard:run:complete', () => setDashboardStatus('Done'))
        .on('dashboard:edit:start', () => setDashboardStatus('Editing'))
        
        // STEP 2

        // START
        // Make sure if the filters in the Looker UI change the external filters update
        // END

        .on('dashboard:edit:cancel', () =>
          setDashboardStatus('Editing cancelled')
        )
        .on('dashboard:save:complete', () => setDashboardStatus('Saved'))
        .on('dashboard:delete:complete', () => setDashboardStatus('Deleted'))

        // Listen to session status
        .on('session:status', (event) => {
          if (event.expired) {
            setDashboardStatus('Session expired')
          } else if (event.interrupted) {
            setDashboardStatus('Session interrupted')
          }
        })
        // Give the embedded content a class for styling purposes
        .withClassName('looker-embed')
        .build()
        .connect()
        .then(onDashboardSetup)
        .catch((error) => {
          setDashboardStatus('Connection error')
          console.error('Connection error', error)
          navigate("/")
        })
    },
    [setDashboardStatus, initialFilter, navigate, id]
  )

  return (
    <div className={(tab === 3 ? 'hide' : 'show')} id="dashboard-container">
      <div id="dashboard-state" className="loading-message">
        {dashboardStatus}
      </div>
      <div id="dashboard" ref={setupDashboard}></div>
    </div>
  )
}

export default EmbedDashboard
