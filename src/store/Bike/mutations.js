export default {
  refresh(state, bikes) {

    state.bikes = bikes;

    return state;
  }, 
  refreshById(state, bike) {

    state.bike = bike;
    
    return state;
  }
};