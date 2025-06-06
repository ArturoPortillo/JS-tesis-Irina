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

    function scheduleNextMinuteRefresh() {
      const now = new Date();
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      console.log(`Scheduling refresh in ${msUntilNextMinute / 1000} seconds.`);
      setTimeout(() => {
        location.reload(); // Full page reload every minute
      }, msUntilNextMinute);
    }

    // Run on load
    fetchFlag();
    scheduleNextMinuteRefresh();