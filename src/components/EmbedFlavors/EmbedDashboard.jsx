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

const tiers = [
  {
    name: 'Basic',
    price: '$0',
    current: true,
    features: ['Basic Analytics', 'Standard Reports', 'Email Support']
  },
  {
    name: 'Advanced',
    price: '$29',
    recommended: true,
    features: ['Data Drilling', 'Advanced Analytics', 'Priority Support', 'Custom Reports']
  },
  {
    name: 'Premium',
    price: '$99',
    features: ['All Advanced Features', 'API Access', '24/7 Support', 'Custom Solutions', 'Dedicated Account Manager']
  }
];

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
      <dialog id="monetization" className="p-8 rounded-xl shadow-2xl w-full max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Upgrade Your Plan</h2>
        <button 
          onClick={() => document.getElementById("monetization").close()}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className={`p-6 relative h-[500px] flex flex-col rounded-lg border ${
            tier.recommended ? 'ring-2 ring-blue-500' : ''
          }`}>
            {tier.recommended && (
              <div className="absolute -top-3 left-0 right-0">
                <div className="bg-blue-500 text-white text-center py-1 text-sm rounded-full mx-auto w-32">
                  Recommended
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <div className="text-3xl font-bold mt-2">{tier.price}<span className="text-base font-normal text-gray-500">/mo</span></div>
            </div>
            
            <ul className="space-y-4 flex-grow">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full py-2 px-4 rounded-lg ${
                tier.current ? 'bg-gray-100 text-gray-700' :
                tier.recommended ? 'bg-blue-500 text-white hover:bg-blue-600' :
                'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              {tier.current ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
      </dialog>
      <div id="dashboard" ref={setupDashboard}></div>
    </div>
  )
}

export default EmbedDashboard
