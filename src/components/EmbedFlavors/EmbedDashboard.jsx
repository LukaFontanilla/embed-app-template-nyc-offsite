import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import React from 'react'

const EmbedDashboard = ({id, setDashboard, tab, setDashboardStatus, filterName, setSelectedFilter, setDashboardOptions}) => {
  const navigate = useNavigate()

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
        .on('dashboard:loaded', () => {
          setDashboardStatus('Loaded')
          // STEP 2
          // START


          // END
        })
        .on('dashboard:run:start', (e) => {
          console.log("Dashboard: ", e)
          setDashboardStatus('Running')
        })
        .on('dashboard:run:complete', () => {
          setDashboardStatus('Done')
          // STEP 2
          // START


          // END
        })
        .on('dashboard:edit:start', () => setDashboardStatus('Editing'))

        .on('dashboard:edit:cancel', () =>
          setDashboardStatus('Editing cancelled')
        )
        .on('dashboard:save:complete', () => setDashboardStatus('Saved'))
        .on('dashboard:delete:complete', () => setDashboardStatus('Deleted'))

        .on('dashboard:filters:changed', (e) => {
          setSelectedFilter(e.dashboard.dashboard_filters[filterName])
        })

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
