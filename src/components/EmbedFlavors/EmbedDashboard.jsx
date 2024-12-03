import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'

/**
 * Day 1 Challenge 4: Targeting Specific Theme Attributes
 * 
 * Task steps:
 * - Navigate to Step 1
 * - Add the SDK method that allows targeting specific theme attributes
 */

const EmbedDashboard = ({id, dashboard,setDashboard, tab}) => {
  const navigate = useNavigate()
  const [dashboardStatus, setDashboardStatus] = useState('Loading...')

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

        // STEP 1

        // START
        // Add sdk method for targeting background color of iframe here
        // END


        // Listen to messages to display progress
        .on('dashboard:loaded', () => setDashboardStatus('Loaded'))
        .on('dashboard:run:start', (e) => {
          // console.log("Dashboard Run: ", e)
          setDashboardStatus('Running')
        })
        .on('dashboard:run:complete', () => setDashboardStatus('Done'))
        .on('dashboard:edit:start', () => setDashboardStatus('Editing'))
        .on('dashboard:filters:changed', (e) => {
          // console.log("Filters Changed: ", e)
        })
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
