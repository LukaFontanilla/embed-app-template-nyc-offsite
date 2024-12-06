import React, { useEffect, useState } from 'react'
import Tile from 'components/Tile/Tile'
import EmbedDashboard from 'components/EmbedFlavors/EmbedDashboard'
import EmbedLook from './EmbedLook'
import { lookerConfig } from 'lookerConfig'

/**
 * Day 2 Challenge 3: Changing Dashboard Layout Properties
 * 
 * Task steps:
 * - Navigate to STEP 1 in this file
 * - Uncomment the commented out code and Fill in the built in cartesian series options for Looker
 * - Navigate to STEP 2 in the EmbedFlavors/EmbedDashboard.jsx file
 * - For both, find the given report's options value and pass it to the setDashboardOptions() function
 * - Navigate to STEP 3 in the EmbedFlavors.jsx file
 * - Uncomment the useEffect and the function below it
 * - Complete the code within the if(updatedOptions) {} to update the dashboard Options with the Embed SDK
 */

function TabbedEmbed() {
  const [tab, setTab] = useState(1)
  const [dashboard, setDashboard] = useState(undefined)
  const [selectedLook, setSelectedLook] = useState(209)
  const defaultDashboard = lookerConfig.tab1DashboardId
  const filterName = 'Traffic Source'
  const filterOptions = ['Display','Email','Organic','Search']
  const initialFilter = filterOptions[0]
  const [dashboardStatus, setDashboardStatus] = useState('Loading...')
  const [selectedFilter, setSelectedFilter] = useState(initialFilter)

  // STEP 1
  // START

  // const [seriesType, setSeriesType] = useState(null)
  // const [dashboardOptions, setDashboardOptions] = useState(null)
  // const seriesOptions = []

  // END

  // STEP 3
  // START

  // useEffect(() => {
  //   // First check if all required values exist
  //   if (!dashboard || !dashboardOptions || !seriesType) {
  //     return;
  //   }

  //   // Safely access and transform dashboard options
  //   try {
  //     const updatedOptions = changeVisualizationType(dashboardOptions, seriesType);
  //     if (updatedOptions) {
        
  //     }
  //   } catch (error) {
  //     console.error('Error updating dashboard visualization:', error);
  //   }
  // }, [dashboard, seriesType, dashboardOptions]);

  /**
 * Changes the visualization type for all column, area, and line charts in a dashboard configuration
 * @param {Object} dashboardConfig - The dashboard configuration object
 * @param {string} newType - The new visualization type 
 * @returns {Object} Updated dashboard configuration
 */
  // function changeVisualizationType(dashboardConfig, newType) {
    
  //   // Create a deep copy of the dashboard config to avoid modifying the original
  //   const updatedConfig = JSON.parse(JSON.stringify(dashboardConfig));
    
  //   // Get all elements from the dashboard
  //   const elements = updatedConfig.elements;
    
  //   // Iterate through each element
  //   Object.keys(elements).forEach(elementId => {
  //     const element = elements[elementId];
      
  //     // Check if the element has vis_config
  //     if (element.vis_config && element.vis_config.type) {
  //       const currentType = element.vis_config.type;
        
  //       // Check if current visualization type is one we can change
  //       if (seriesOptions.includes(currentType)) {
  //         // Store original type for reference
  //         // element.vis_config.original_type = currentType;
          
  //         // Update to new visualization type
  //         element.vis_config.type = newType;
          
  //         // Handle specific configuration adjustments based on new type
  //         if (newType === 'looker_area') {
  //           // Add area chart specific configurations
  //           element.vis_config.stacking = element.vis_config.stacking || 'normal';
  //           element.vis_config.interpolation = element.vis_config.interpolation || 'monotone';
  //         } else if (newType === 'looker_column') {
  //           // Add column chart specific configurations
  //           element.vis_config.stacking = element.vis_config.stacking || '';
  //           delete element.vis_config.interpolation;
  //         } else if (newType === 'looker_line') {
  //           // Add line chart specific configurations
  //           element.vis_config.interpolation = element.vis_config.interpolation || 'linear';
  //           delete element.vis_config.stacking;
  //         }
  //       }
  //     }
  //   });
    
  //   return updatedConfig;
  // }
  // END

  const looks = [
    { id: lookerConfig.tab1LookId, question: "Business Question 1" },
    { id: lookerConfig.tab2LookId, question: "Business Question 2" }
  ];

  useEffect(() => {
    const loadDashboardWithFilters = async () => {
      if (!dashboard) return;

      try {
        // Determine which dashboard to load based on tab
        const dashboardId = tab === 1 
          ? lookerConfig.tab1DashboardId 
          : lookerConfig.tab2DashboardId;

        await dashboard.loadDashboard(`${dashboardId}?${filterName}=${selectedFilter}`, true);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } 
    };

    loadDashboardWithFilters();

    // Cleanup function to handle unmounting
    return () => {
      // Add any necessary cleanup here
    };
  }, [dashboard, tab, selectedFilter]);


  const loadLooks = () => {
    return (
      <div className="flex h-[95%] w-full flex-row p-0 relative">
      <div className="relative flex size-full w-1/3">
        <div className="mr-6 mt-8 flex h-full flex-col">
          {looks.map((look) => (
            <div
              key={look.id}
              onClick={() => setSelectedLook(look.id)}
              className={`flex cursor-pointer justify-between gap-5 border-t border-[#B1B1BD]/40 px-2 py-6 text-[17px] leading-tight antialiased last:border-b ${
                selectedLook === look.id
                  ? "text-primary-blue font-medium"
                  : "font-normal text-[#51515B]"
              }`}
            >
              <span>{look.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 13"
                fill="none"
                className="w-2 min-w-2 shrink-0"
              >
                <path
                  d="M1 12L6 6.5L1 1"
                  stroke={selectedLook === look.id ? "#2092fd" : "#51515B"}
                  strokeOpacity="0.5"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 relative overflow-hidden">
        {looks.map((look) => (
          <div
            key={look.id}
            className={`scrollitem absolute w-full h-full transition-all duration-500 ease-in-out ${
              selectedLook === look.id ? 'active' : ''
            }`}
          >
            <EmbedLook id={look.id} />
          </div>
        ))}
      </div>
    </div>
  )}

  return (
    <>
        <Tile styles="h-full w-full flex flex-col">
          <div class="w-[10vw] pl-4">
            <div class="mb-4 flex flex-row gap-3 text-[14px]">
              <div class="flex-1" onClick={() => setTab(1)}>
                <div class="group flex cursor-pointer flex-col border-b-4 py-2 pl-0 pt-5 text-left duration-300 ease-in-out text-[#9f9fa8] border-[#cfcfd9] hover:text-[#51515b]">
                <span class="flex-0 whitespace-nowrap px-3 antialiased">Overview</span>
                </div>
              </div>
              <div class="flex-1" onClick={() => setTab(2)}>
                <div class="group flex cursor-pointer flex-col border-b-4 py-2 pl-0 pt-5 text-left duration-300 ease-in-out text-[#9f9fa8] border-[#cfcfd9] hover:text-[#51515b]">
                  <span class="flex-0 whitespace-nowrap px-3 antialiased">Advanced</span>
                </div>
              </div>
              <div class="flex-1" onClick={() => setTab(3)}>
                <div class="group flex cursor-pointer flex-col border-b-4 py-2 pl-0 pt-5 text-left duration-300 ease-in-out border-primary-blue text-[#51515b]">
                  <span class="flex-0 whitespace-nowrap px-3 antialiased">Guided</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full pl-4 pr-4 h-[92%]">
          {tab !== 3 && (
            <>
            <label>
                Dashboard filter: {selectedFilter}
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                  {filterOptions.map((o) => (
                    <option value={o}>{o}</option>
                    ))}
                </select>
            </label>
            <label>
              Looker Series Type: {seriesType}
              <select
                value={seriesType}
                onChange={(e) => setSeriesType(e.target.value)}
                >
                {seriesOptions.map((o) => (
                  <option value={o}>{o}</option>
                  ))}
              </select>
            </label>
            </>
            )}
          <EmbedDashboard 
            id={defaultDashboard} 
            dashboard={dashboard} 
            setDashboard={setDashboard} 
            tab={tab} 
            setDashboardStatus={setDashboardStatus}
            filterName={filterName}
            setSelectedFilter={setSelectedFilter}
            setDashboardOptions={setDashboardOptions}
            />
            {tab === 3 && loadLooks()}
          </div>
        </Tile>
    </>
  )
}

export default TabbedEmbed