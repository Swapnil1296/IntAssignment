import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createFilter } from "redux-persist-transform-filter";
const initialState = {
  PartOne: [],
  PartTwo: [],
  PartThree: [],
  studentData: [],
  Auth: "",
  isLoggedIng: false,
};
//ADDSTUDENTINFO
// ADDTOSECTIONONE;
//DELETEFROMSECTIONONE;
//UPDATETOSECTIONONE;
//ADDTOSECTIONTWO;
//DELETEFROMSECTIONTWO;
//UPDATETOSECTIONTWO;
//ADDTOSECTIONTHREE;
//DELETEFROMSECTIONTHREE;
//UPDATETOSECTIONTHREE;

const reducerFn = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        Auth: payload,
        isLoggedIng: true,
      };
    case "LOGOUT":
      return {
        ...state,
        Auth: "",
        isLoggedIng: false,
      };
    case "ADDSTUDENTINFO":
      return { ...state, studentData: [...state.studentData, payload] };
    case "ADDTOSECTIONONE":
      return { ...state, PartOne: [...state.PartOne, payload] };
    case "DELETEFROMSECTIONONE":
      return {
        ...state,
        PartOne: state.PartOne.filter((data) => data.id !== payload),
      };
    case "UPDATETOSECTIONONE":
      // console.log("payload:-", payload);
      state.PartOne.splice(payload.index, 1, payload.data);
      // console.log("state_partOne", state.PartOne);
      return {
        ...state,
        PartOne: state.PartOne,
      };
    case "ADDTOSECTIONTWO":
      return { ...state, PartTwo: [...state.PartTwo, payload] };
    case "DELETEFROMSECTIONTWO":
      return {
        ...state,
        PartTwo: state.PartTwo.filter((data) => data.id !== payload),
      };
    case "UPDATETOSECTIONTWO":
      console.log("update:-", payload);
      state.PartTwo.splice(payload.index, 1, payload.data);
      console.log("update.PartTwo:-", state.PartTwo);
      return {
        ...state,
        PartTwo: state.PartTwo,
      };
    case "ADDTOSECTIONTHREE":
      console.log("Addtosectionthree:-", payload);
      return { ...state, PartThree: [...state.PartThree, payload] };
    case "DELETEFROMSECTIONTHREE":
      return {
        ...state,
        PartThree: state.PartThree.filter((data) => data.id !== payload),
      };
    case "UPDATETOSECTIONTHREE":
      console.log("update:-", payload);
      state.PartThree.splice(payload.index, 1, payload.data);
      console.log("update.PartTwo:-", state.PartThree);
      return {
        ...state,
        PartThree: state.PartThree,
      };
    default:
      return state;
  }
};
 const saveUserLoginSubsetFilter = createFilter("userLogin", ["isLoggedIng"]);

const persistConfig = {
  key: "root",
  storage,
   whitelist: ["isLoggedIng","Auth"],
   transforms: [saveUserLoginSubsetFilter],
};
const persistedReducer = persistReducer(persistConfig, reducerFn);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
