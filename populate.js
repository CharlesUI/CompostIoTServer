const ProductModel = require("./model/Product");
const connectDB = require("./db/connect");
require('dotenv').config()

const products = [
  {
    ITEM: "VANGUARD® PLUS 5",
    ITEM_TYPE: "Canine Distemper-Adenovirus Type2-Parainfluenza-Parvovirus",
    DOSAGE: "1mL",
    MFG_DATE: new Date("Jul/21/2023"),
    EXP_DATE: new Date("Jul/21/2025"),
    STOCK_COUNT: 48
  },
  {
    ITEM: "NOBIVAC® 3-RABIES",
    ITEM_TYPE: "Canine, Feline, and Ferrets Rabies Vaccine",
    DOSAGE: "1mL",
    MFG_DATE: new Date("Jan/1/2024"),
    EXP_DATE: new Date("Jan/1/2026"),
    STOCK_COUNT: 50
  },
  {
    ITEM: "Vanguard® Feline RCP",
    ITEM_TYPE: "Feline Rhinotracheitis-Calcici-Panleukopenia Vaccine",
    DOSAGE: "1mL",
    MFG_DATE: new Date("Feb/13/2023"),
    EXP_DATE: new Date("Jan/13/2025"),
    STOCK_COUNT: 25
  },
  {
    ITEM: "ANIPRYL®",
    ITEM_TYPE: "Aelegiline Hydrochloride Tablets",
    DOSAGE: "5mg",
    MFG_DATE: new Date("Apr/3/2024"),
    EXP_DATE: new Date("Apr/3/2024"),
    STOCK_COUNT: 90
  },
  {
    ITEM: "Alfaxan® Multidose CIV",
    ITEM_TYPE: "Alfaxalone Medication",
    DOSAGE: "10mg/mL",
    MFG_DATE: new Date("Dec/15/2022"),
    EXP_DATE: new Date("Dec/15/2025"),
    STOCK_COUNT: 239
  },
  {
    ITEM: "CLAVAMOX®",
    ITEM_TYPE: "Amoxicillin and Clavulanate Potassium Tablets",
    DOSAGE: "375mg",
    MFG_DATE: new Date("Jul/21/2023"),
    EXP_DATE: new Date("Jul/21/2025"),
    STOCK_COUNT: 300
  },
  {
    ITEM: "CESTEX®",
    ITEM_TYPE: "Epsiprantel",
    DOSAGE: "100mg",
    MFG_DATE: new Date("Apr/13/2024"),
    EXP_DATE: new Date("Apr/13/2026"),
    STOCK_COUNT: 270
  },
  {
    ITEM: "Litovine Syrup",
    ITEM_TYPE: "Liver Tonic and Renal Enhancer Supplement",
    DOSAGE: "120mL",
    MFG_DATE: new Date("Aug/23/2023"),
    EXP_DATE: new Date("Aug/23/2025"),
    STOCK_COUNT: 17
  },
  {
    ITEM: "Canicee",
    ITEM_TYPE: "Vitamin C Immune Booster",
    DOSAGE: "60mL",
    MFG_DATE: new Date("Sep/10/2023"),
    EXP_DATE: new Date("Sep/10/2025"),
    STOCK_COUNT: 14
  },
  {
    ITEM: "LC-VIT Syrup",
    ITEM_TYPE: "Vitamins / Amino Acid",
    DOSAGE: "120mL",
    MFG_DATE: new Date("Nov/4/2022"),
    EXP_DATE: new Date("Nov/4/2024"),
    STOCK_COUNT: 23
  },
  {
    ITEM: "Iron-Aid Syrup",
    ITEM_TYPE: "Minerals Supplement",
    DOSAGE: "60mL",
    MFG_DATE: new Date("Aug/14/2023"),
    EXP_DATE: new Date("Aug/14/2026"),
    STOCK_COUNT: 42
  },
  {
    ITEM: "Cerenia®",
    ITEM_TYPE: "Maropitant Citrate Tablets",
    DOSAGE: "10mgL",
    MFG_DATE: new Date("Jul/4/2023"),
    EXP_DATE: new Date("Jul/4/2025"),
    STOCK_COUNT: 137
  },
  {
    ITEM: "Convenia®",
    ITEM_TYPE: "Cefovecin Sodium",
    DOSAGE: "80mg",
    MFG_DATE: new Date("Oct/5/2023"),
    EXP_DATE: new Date("Oct/5/2025"),
    STOCK_COUNT: 254
  },
  {
    ITEM: "Cytopoint®",
    ITEM_TYPE: "Canine Allergic Dermatitis Immunotherapeutic",
    DOSAGE: "40mg",
    MFG_DATE: new Date("Jan/1/2024"),
    EXP_DATE: new Date("Jan/1/2026"),
    STOCK_COUNT: 163
  },
  {
    ITEM: "DOXIROBE® Gel",
    ITEM_TYPE: "Doxycycline Hyclate",
    DOSAGE: "0.5mL",
    MFG_DATE: new Date("Mar/16/2024"),
    EXP_DATE: new Date("Mar/16/2026"),
    STOCK_COUNT: 124
  },
  {
    ITEM: "DERMA-CLENS",
    ITEM_TYPE: "Benzoic Acid, Malic Acid, Salicylic Acid",
    DOSAGE: "28.35g",
    MFG_DATE: new Date("Apr/30/2022"),
    EXP_DATE: new Date("Apr/30/2025"),
    STOCK_COUNT: 64
  },
  {
    ITEM: "Dexdomitor®",
    ITEM_TYPE: "Dexmedetomidine Hydrochloride",
    DOSAGE: "10mL",
    MFG_DATE: new Date("Feb/23/2023"),
    EXP_DATE: new Date("Feb/23/2025"),
    STOCK_COUNT: 220
  },
  {
    ITEM: "DIROBAN™",
    ITEM_TYPE: "Melarsomine Dihydrochloride",
    DOSAGE: "50mg",
    MFG_DATE: new Date("Jan/4/2022"),
    EXP_DATE: new Date("Jan/4/2024"),
    STOCK_COUNT: 97
  },
  {
    ITEM: "ERADIMITE™",
    ITEM_TYPE: "Pyrethrins, Piperonyl Butoxide",
    DOSAGE: "1 fl oz",
    MFG_DATE: new Date("May/25/2022"),
    EXP_DATE: new Date("May/25/2024"),
    STOCK_COUNT: 81
  },
  {
    ITEM: "LAX’AIRE®",
    ITEM_TYPE: "Laxative and Lubricant Ointment",
    DOSAGE: "3 oz",
    MFG_DATE: new Date("Jan/1/2023"),
    EXP_DATE: new Date("Jan/1/2025"),
    STOCK_COUNT: 172
  },
  {
    ITEM: "NEO-PREDEF® with TETRACAINE",
    ITEM_TYPE: "Neomycin Sulfate, Isoflupedrone Acetate, Tetracaine Hydrochloride Topical Powder",
    DOSAGE: "12g",
    MFG_DATE: new Date("Jun/21/2022"),
    EXP_DATE: new Date("Jun/21/2026"),
    STOCK_COUNT: 217
  }
];


const populate = async () => {
  try {
    await connectDB(process.env.MONGO_LOCAL);
    await ProductModel.insertMany(products);
    console.log('Products added successfully');
  } catch (error) {
    console.error('Error adding products:', error);
  }
};

populate()