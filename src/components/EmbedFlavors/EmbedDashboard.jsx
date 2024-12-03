import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'

/**
 * Day 1 Challenge 6: JS Events - Cancelling Events
 * 
 * Task steps:
 * - Navigate to Step 1
 * - identify the two events that track drilling and exploring from here on a tile
 * - implement logic with the Embed SDK to cancel those events, without having to remove the user permissions
 * - Extra Credit: see the dialog modal with id "monetization" in the render function at the bottom, 
 *    pop that up when a user tries to drill or explore from here
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

        // Listen to messages to display progress
        .on('dashboard:loaded', () => setDashboardStatus('Loaded'))
        .on('dashboard:run:start', (e) => {
          setDashboardStatus('Running')
        })
        .on('dashboard:run:complete', () => setDashboardStatus('Done'))
        .on('dashboard:edit:start', () => setDashboardStatus('Editing'))

        .on('dashboard:edit:cancel', () =>
          setDashboardStatus('Editing cancelled')
        )
        .on('dashboard:save:complete', () => setDashboardStatus('Saved'))
        .on('dashboard:delete:complete', () => setDashboardStatus('Deleted'))

        // STEP 1

        // START

        // .on('',(e) => {})
        // .on('',(e) => {})

        // END

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
    [setDashboardStatus, navigate, id]
  )

  return (
    <div className={(tab === 3 ? 'hide' : 'show')} id="dashboard-container">
      <div id="dashboard-state" className="loading-message">
        {dashboardStatus}
      </div>
      <dialog id="monetization" className="rounded-lg p-2 shadow-md hover:shadow-2xl">
        <button autofocus onClick={(e) => document.getElementById("monetization").close()}>Close</button>
        <div className='h-[20vh] w-[15vw] pt-4'>
          <h1 className="text-lg">Not allowed. Upgrade user tier to Premium to unlock drilling</h1>
        </div>
      </dialog>
      <div id="dashboard" ref={setupDashboard}></div>
    </div>
  )
}

export default EmbedDashboard
