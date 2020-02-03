const northAmerica = [
  { name: "Wailea, HI", id: 5854469, airport: "OGG" },
  { name: "Cambria, CA", id: 5333207, airport: "SBP"},
  { name: "Springdale, UT", id: 5546822, airport: "SGU" },
  { name: "Quebec City, QC", id: 6325494, airport: "YQB" },
  { name: "Ashland, OR", id: 5711789, airport: "MFR"},
  { name: "Calgary, AB", id: 5913490, airport: "YYC"},
  { name: "Victoria, BC", id: 6174041, airport: "YWH"},
  { name: "Sedona, AZ", id: 5313667, airport: "FLG"},
  { name: "Cambridge, MA", id: 4931972, airport: "BOS"},
  { name: "Minneapolis, MN", id: 5037649, airport: "MSP"},
  { name: "Paso Robles, CA", id: 5381438, airport: "SBP"},
  { name: "Solvang, CA", id: 5397059, airport: "SMX"},
  { name: "Bar Harbor, ME", id: 4957320, airport: "BHB"},
  { name: "Key West, FL", id: 4160812, airport: "EYW"},
  { name: "Sanibel, FL", id: 4172052, airport: "RSW"}
];

const southAmerica = [
  { name: "Buenos Aires", id: 3435910, airport: "AEP"},
  { name: "Cartagena", id: 3687238, airport: "CTG"},
  { name: "Lake Titicaca", id: 3937513, airport:"JUL" },
  { name: "Quito", id: 3652462, airport: "UIO" },
  { name: "Rio de Janiero", id: 3451190, airport: "SDU"},
  { name: "Valparaíso", id: 3445575, airport: "ARU"}, //brazil
  { name: "La Paz", id: 3432079, airport: "PRA"}, //argentina
  { name: "Asunción", id: 3439389, airport: "ASU"},
  { name: "Lima", id: 3936456, airport: "LIM"},
  { name: "Medellin", id: 3674962, airport: "EOH"},
  { name: "Santiago", id: 3871336, airport: "SCL"},
  { name: "Cusco", id: 3941584, airport: "CUZ" },
  { name: "São Paulo", id: 3448439, airport: "CGH" },
  { name: "Belize City", id: 3582677, airport: "TZA"},
  { name: "Papagaios", id: 3455195, airport: "CNF"}
];

const europe = [
  { name: "Rome", id: 3169070, airport: "CIA"},
  { name: "London", id: 2643743, airport: "LCY"},
  { name: "Paris", id: 2968815, airport: "ORY"},
  { name: "Florence", id: 6542285, airport: "FLR"},
  { name: "Barcelona", id: 6356055, airport: "BCN"},
  { name: "Amsterdam", id: 2759794, airport: "AMS"},
  { name: "Prague", id: 3067696, airport: "PRG"},
  { name: "Santorini", id: 8133832, airport: "JTR"},
  { name: "Amalfi Coast", id: 3183130, airport: "NAP"},
  { name: "Venice", id: 3164603, airport: "VCE"},
  { name: "Athens", id: 264371, airport: "ATH"},
  { name: "Lausanne", id: 7286283, airport: "GVA"},
  { name: "Vienna", id: 2761369, airport: "VIE"},
  { name: "Nice", id: 2990440, airport: "NCE"},
  { name: "Dublin", id: 2964574, airport: "DUB"}
];

const asia = [
  { name: "Tokyo", id: 1850147, airport: "HND"},
  { name: "Singapore", id: 1880252, airport: "SIN"},
  { name: "Kuala Lumpur", id: 1735161, airport: "SZB"},
  { name: "Ha Noi", id: 1581130, airport: "HAN"},
  { name: "Hong Kong", id: 1819729, airport: "HKG"},
  { name: "Bangkok", id: 1609350, airport: "DMK"},
  { name: "Seoul", id: 1835848, airport: "GMP"},
  { name: "Maldives", id: 1282028, airport: "MLE"},
  { name: "Phuket", id: 1151254, airport: "HKT"},
  { name: "Chiang Mai", id: 1153671, airport: "CNX"},
  { name: "Kyoto", id: 1857910, airport: "ITM"},
  { name: "Taipei", id: 1668341, airport: "TSA"},
  { name: "Krabi", id: 1152633, airport: "KBV"},
  { name: "Shanghai", id: 1796236, airport: "SHA"},
  { name: "Cebu City", id: 1717512, airport: "CEB"}
];

const africa = [
  { name: "Cairo", id: 360630, airport: "CAI"},
  { name: "Cape Town", id: 3369157, airport: "CPT"},
  { name: "Tanzania", id: 149590, airport: "DAR"},
  { name: "Victoria", id: 241131, airport: "SEZ"}, //seychelles
  { name: "Port Louis", id: 934154, airport: "MRU"}, //mauritius
  { name: "Luxor", id: 360502, airport: "LXR"},
  { name: "Antananarivo", id: 1070940, airport: "TNR"}, //madagascar
  { name: "Fez", id: 2548869, airport: "RBA"},
  { name: "Marrakech", id: 6547285, airport: "RAK"},
  { name: "Gaborone", id: 1016666, airport: "GBE"}, //botswana
  { name: "Alexandria", id: 361058, airport: "ALY"},
  { name: "Addis Ababa", id: 344979, airport: "ADD"},
  { name: "Lusaka", id: 909137, airport: "LUN"},
  { name: "Abidjan", id: 2293538, airport: "ABJ"},
  { name: "Dakar", id: 2253354, airport: "DKR"}
];

const australia = [
  { name: "Sydney", id: 2147714, airport: "SYD"},
  { name: "Melbourne", id: 7839805, airport: "MEB" },
  { name: "Gold Coast", id: 2165087, airport: "OOL" },
  { name: "Brisbane", id: 7839562, airport: "BNE" },
  { name: "Adelaide", id: 7839644, airport: "ADL" },
  { name: "Cairns", id: 2172797, airport: "CNS" },
  { name: "Darwin", id: 2073124, airport: "DRW" },
  { name: "Perth", id: 2063523, airport: "PER" },
  { name: "Alice Springs", id: 7839681, airport: "ASP" },
  { name: "Byron Bay", id: 2172880, airport: "BNK" },
  { name: "Hobart", id: 2163355, airport: "SYD" },
  { name: "Canberra", id: 2172517, airport: "CBR" },
  { name: "Noosa", id: 2155135, airport: "MCY" },
  { name: "Atherton", id: 2177541, airport: "CNS" },
  { name: "Blue Mountains", id: 6615604, airport: "SYD" }
];

module.exports = {
    northAmerica: northAmerica, 
    southAmerica: southAmerica, 
    asia: asia, 
    africa: africa, 
    australia: australia,
    europe: europe
}