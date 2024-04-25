import { IProperties } from "@/types/properties";

export const useGetPropertyByIdQuery = (
  id: number
): {
  data: IProperties;
} => {
  return {
    data: {
      id: 0,
      code: "565",
      blueprints: [],
      manager: {
        id: 1,
        firstName: "tester",
        lastName: "testoglou",
        isActive: true,
        preferredLanguage: { key: "ENGLISH", value: "" },
        profilePhoto: "MTIzMTMxMzEy",
        username: "",
        email: "",
        password: "",
        mobilePhone: "",
        homePhone: "",
        businessPhone: "",
        officePhone: "",
        callCenterNumber: "",
        address: "",
        zipCode: "",
        city: "",
        region: "",
        afm: "",
        doy: "",
        gemh: "",
        properties: [],
        isAdmin: false,
        joinedIn: "",
        registrationDate: "",
      },
      owner: {} as any,
      state: { key: "RENT", value: "Rent" },
      parentCategory: { key: "RESIDENTIAL", value: "Residential" },
      category: { key: "STUDIO", value: "Studio" },
      area: 1,
      plotArea: 2,
      price: 1.22222e7,
      averageUtils: 2,
      rented: false,
      currentRentPrice: 4,
      estimatedRentPrice: 1,
      rentalStart: "",
      rentalEnd: "",
      availableAfter: "",
      keyCode: "",
      auction: false,
      debatablePrice: false,
      buildable: false,
      video: "https://www.youtube.com/watch?v=UEEm61impBY",
      propertyImage: {
        id: 4800,
        hidden: false,
        description: "",
        title: "",
        orderNumber: 0,
        url: "https://d1o8f6oijbfd0m.cloudfront.net/image_1___d631aedd-15de-4b63-823c-b5e8ff35f978_DSC_5323-HDR.JPG",
        key: "image_1___d631aedd-15de-4b63-823c-b5e8ff35f978_DSC_5323-HDR.JPG",
        thumbnail: true,
        filename: "DSC_5323-HDR.JPG",
      },
      suitableFor: {
        student: false,
        cottage: false,
        touristRental: false,
        investment: false,
        doctorsOffice: false,
        professionalUse: false,
        renovation: false,
        agriculturalUse: false,
      },
      heatingAndEnergy: {
        energyClass: { key: "", value: "" },
        heatingType: { key: "", value: "" },
        heatingSystem: { key: "", value: "" },
        electricityType: { key: "", value: "" },
        floorHeating: false,
        airConditioning: false,
        solarBoiler: false,
        offPeakElectricity: false,
      },
      distances: {
        schools: 0,
        supermarket: 1,
        cafeRestaurant: 2,
        hospital: 3,
        airport: 4,
        sea: 5,
        publicTransport: 6,
        entertainment: 7,
      },
      areas: {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
        plot: 6,
        covered: 7,
        basement: 8,
        attic: 9,
        garden: 10,
        balconies: 11,
        storeroom: 12,
        groundFloor: 13,
      },
      construction: {
        yearOfConstruction: 1,
        underConstruction: false,
        newlyBuilt: false,
        incomplete: false,
        totalFloorNumber: 2,
        internalStairs: false,
        neoclassical: false,
        yearOfRenovation: 3,
        renovated: false,
        elevator: false,
        needsRenovation: false,
        preserved: false,
        poolSize: 0.0,
      },
      technicalFeatures: {
        entrances: 1,
        displayWindowsLength: 2,
        safetyDoor: false,
        alarmSystem: false,
        painted: false,
        furnished: { key: "", value: "" },
        frameType: { key: "", value: "" },
        paneGlassType: { key: "", value: "" },
        windowScreens: false,
        fireplace: false,
        bright: false,
        luxurious: false,
        electricCarChargingFacilities: false,
        reception: false,
        petsAllowed: false,
        floorType: { key: "", value: "" },
        satelliteTV: false,
        wiring: false,
        loadingUnloadingElevator: false,
        falseCeiling: false,
        withEquipment: false,
        doubleFrontage: false,
        consideration: false,
        floorToAreaRatio: 1,
        coverageFactor: 2,
        facadeLength: 3,
        inclination: { key: "", value: "" },
      },
      details: {
        floor: { key: "", value: "" },
        bedrooms: 1,
        kitchens: 2,
        wc: 3,
        layers: 4,
        livingrooms: 5,
        bathrooms: 6,
        rooms: 7,
        attic: false,
        storeroom: false,
        playroom: false,
        floorApartment: false,
        penthouse: false,
        orientation: { key: "", value: "" },
        viewType: { key: "", value: "" },
        accessibility: { key: "", value: "" },
        landUse: { key: "", value: "" },
        zoneType: { key: "", value: "" },
        balconies: [],
        parkings: [],
        frontage: 0.0,
        plotFrontage: 0.0,
        buildingBalance: 0.0,
        totalConstruction: 0.0,
        permissibleBuildingHeight: 0.0,
        permissibleFloors: 0,
        legalAndTechnicalControl: false,
        irrigation: false,
        waterSupply: false,
        electricitySupply: false,
        setbackCoefficient: 0.0,
        hasBuildingPermit: false,
        hasBuilding: false,
        goldenVisa: false,
      },
      location: {
        street: "Αγίου Κωνσταντίνου",
        number: "39",
        complex: "",
        zipCode: 10437,
        city: "6010",
        region: "100",
        country: "",
        lat: 37.984587694067464,
        lng: 23.723553237403866,
        locationDisplay: { key: "NOT_VISIBLE", value: "Not visible" },
      },
      features: {
        panoramicView: false,
        seaView: false,
        mountainView: false,
        seaFront: false,
        walkableDistanceToBeach: false,
        quietArea: false,
        bright: false,
        nearBusRoute: false,
        smartHome: false,
        guestroom: false,
        office: false,
        homeCinema: false,
        combinedKitchenAndDiningArea: false,
        soundInsulation: false,
        thermalInsulation: false,
        heatedPool: false,
        indoorPool: false,
        organizedGarden: false,
        jacuzzi: false,
        well: false,
        drilling: false,
        masonryFence: false,
        accessForDisabled: false,
        alarmSystem: false,
        has24HoursSecurity: false,
        cctv: false,
        internet: false,
        fireDetector: false,
        independentHeatingPerRoom: false,
        adaptingToTheGround: false,
        barbeque: false,
        pool: false,
        view: false,
        facade: false,
        corner: false,
        veranda: false,
        tents: false,
        withinResidentialZone: false,
        withinCityPlan: false,
        loadingDock: false,
      },
      notes: [],
      images: [
        {
          id: 4800,
          hidden: false,
          description: "",
          title: "",
          orderNumber: 0,
          url: "https://d1o8f6oijbfd0m.cloudfront.net/image_1___d631aedd-15de-4b63-823c-b5e8ff35f978_DSC_5323-HDR.JPG",
          key: "image_1___d631aedd-15de-4b63-823c-b5e8ff35f978_DSC_5323-HDR.JPG",
          thumbnail: true,
          filename: "DSC_5323-HDR.JPG",
        },
      ],
      documents: [
        {
          id: 34,
          url: "https://d1o8f6oijbfd0m.cloudfront.net/document___be268569-0e58-4179-b883-95bfce1f29e7_ugrad-thesis-C.Papastavrou-1059621.pdf",
          key: "document___be268569-0e58-4179-b883-95bfce1f29e7_ugrad-thesis-C.Papastavrou-1059621.pdf",
          labels: [],
          filename: "ugrad-thesis-C.Papastavrou-1059621.pdf",
        },
      ],
      googleEarth: {} as any,
      labels: [],
      createdAt: "1",
      updatedAt: "2",
      // active: false,
      // hidden: false,
      exclusive: false,
      // archived: false,
      listings: { PUBLIC_SITE: true, SPITOGATOS: false },
      descriptions: {},
    },
  };
};
