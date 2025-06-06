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
        } else {
          console.log("Flag is false – setting color to black.");
          if (colorInterval) clearInterval(colorInterval);
          setDivColor('black');
        }
      } catch (error) {
        console.error("Failed to fetch flag:", error);
      }
    }

    function scheduleNextQuarterMinuteRefresh() {
      const now = new Date();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();

      // Next quarter: 15, 30, 45, 60 (0)
      const nextQuarterSec = Math.ceil(seconds / 15) * 15;
      const delaySec = nextQuarterSec - seconds;
      const delayMs = delaySec * 1000 - milliseconds;

      console.log(`Now: ${now.toLocaleTimeString()}`);
      console.log(`Scheduling refresh in ${delayMs / 1000} seconds.`);

      setTimeout(() => {
        location.reload();
      }, delayMs);
    }

    // On load
    fetchFlag();
    scheduleNextQuarterMinuteRefresh();