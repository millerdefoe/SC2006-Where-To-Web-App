export const routeData = {
    fastest: {
      title: "Fastest Route",
      duration: "25 mins",
      icons: [
        { type: "svg", name: "walking" },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "bus" },
        { type: "badge", label: "48", isBus: true },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "walking" },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "train" },
        { type: "badge", label: "TEL" },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "walking" }
      ],
      directions: [
        "Walk to bus stop opposite Tg Katong Rd",
        "Board Bus 48",
        "Alight at MRT Station",
        "Walk to TEL line platform",
        "Board TEL train",
        "Walk to your destination"
      ]
    },
    leastCongested: {
      title: "Less Congested Route",
      duration: "30 mins",
      icons: [
        { type: "svg", name: "walking" },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "bus" },
        { type: "badge", label: "14", isBus: true },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "train" },
        { type: "badge", label: "DTL" },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "walking" },
        { type: "svg", name: "arrow" },
        { type: "svg", name: "train" },
        { type: "badge", label: "NEL" }
      ],
      directions: [
        "Walk to bus stop A",
        "Board Bus 14",
        "Alight at MRT interchange",
        "Board DTL train",
        "Transfer to NEL train",
        "Arrive at destination"
      ]
    }
  };
  