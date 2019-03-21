import WeatherSagas from "./Weather";
import DroneSages from "./Drone";
import ApiErrors from "./ApiErrors";

export default [...ApiErrors, ...WeatherSagas, ...DroneSages];
