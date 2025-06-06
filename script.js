  function setDivColor(color) {
      const colorDiv = document.getElementById('colorDiv');
      if (colorDiv) {
        colorDiv.style.backgroundColor = color;
      }
    }

    let colorInterval;

    async function fetchFlag() {
      try {
        const response = await fetch('https://64489661e7eb3378ca319547.mockapi.io/flags');
        const data = await response.json();

        console.log("Fetched data:", data);
        const flagValue = data[0]?.value;

        if (flagValue) {
          console.log("Flag is true – starting color cycle.");
          if (colorInterval) clearInterval(colorInterval);
          const colors = ['fuchsia', 'green', 'yellow'];
          let idx = 0;
          setDivColor(colors[idx]);
          colorInterval = setInterval(() => {
            idx = (idx + 1) % colors.length;
            setDivColor(colors[idx]);
          }, 500);

          // Don't schedule refresh when flag is true
        } else {
          console.log("Flag is false – setting color to black and scheduling refresh.");
          if (colorInterval) clearInterval(colorInterval);
          setDivColor('black');
          scheduleRefreshIn30Seconds(); // only if false
        }
      } catch (error) {
        console.error("Failed to fetch flag:", error);
        scheduleRefreshIn30Seconds(); // fallback refresh on error
      }
    }

    function scheduleRefreshIn30Seconds() {
      console.log("Scheduling refresh in 30 seconds.");
      setTimeout(() => {
        location.reload();
      }, 30000); // 30 seconds
    }

    // Run
    fetchFlag();