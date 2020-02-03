export default {
  refresh(state, cars) {

    state.cars = cars;

    return state;
  }, 
  refreshById(state, car) {

    state.car = car;
    
    return state;
  }
};