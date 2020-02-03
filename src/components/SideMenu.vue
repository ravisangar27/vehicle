<template> 
  <nav class="navbar navbar-expand-md navbar-light">
    <button class="navbar-toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#myNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="myNavbar">
      <div class="container-fluid">
        <div class="row">
            <!-- sidebar -->
          <div class="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top">
            <a href="#" class="navbar-brand text-white d-block mx-auto text-center py-3 mb-4 bottom-border">Vehicle Management System</a>
            <div class="bottom-border pb-3">
                <a href="#" class="text-white">Kandiah Ravisangar</a>
            </div>
            <ul class="navbar-nav flex-column mt-4">
              <li class="nav-item"><router-link class="nav-link text-white p-3 mb-2 sidebar-link" to="/admin/car"><font-awesome-icon class="mr-3" icon="car" /> Car</router-link></li>
              <li class="nav-item"><router-link class="nav-link text-white p-3 mb-2 sidebar-link" to="/admin/bike"><font-awesome-icon class="mr-3" icon="motorcycle" />Bike</router-link></li>
            </ul>
          </div>
            <!-- end of sidebar -->
            <!-- top-nav -->
          <div class="col-xl-10 col-lg-9 col-md-8 ml-auto bg-dark fixed-top py-2 top-navbar">
            <div class="row align-items-center">
              <div class="col-md-4">
                <h4 class="text-light text-uppercase mb-0">Dashboard</h4>
              </div>
              <div class="col-md-5">
                <form>
                  <div class="input-group">
                    <input type="text" class="form-control search-input" placeholder="Search...">
                    <button type="button" class="btn btn-white search-button"><i class="fas fa-search text-danger"></i></button>
                  </div>
                </form>
              </div>
              <div class="col-md-3">
                  
              </div>
            </div>
          </div>
            <!-- end of top-nav -->
        </div>
      </div>
    </div>
  </nav> 
</template>

<script>
export default {
    
}
</script>
<style>

body {
    font-family: 'Montserrat', sans-serif;
    background-color: #eee;
  }
  
  /* navbar */
  .sidebar {
    height: 100vh;
   background: linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(../assets/images/img1.jpeg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 5px 7px 25px #999;
  }
  
  .bottom-border {
    border-bottom: 1px groove #eee;
  }
  
  .sidebar-link {
    transition: all .4s;
  }
  
  .sidebar-link:hover {
    background-color: #444;
    border-radius: 5px;
  }
  
  .router-link-exact-active {
    background-color: #f44336;
    border-radius: 7px;
    box-shadow: 2px 5px 10px #111;
    transition: all .3s;
  }
  
  .router-link-exact-active:hover {
    background-color: #f66436;
    border-radius: 7px;
    box-shadow: 2px 5px 20px #111;
    transform: translateY(-1px);
  }

  .router-link-active {
    background-color: #f44336;
    border-radius: 7px;
    box-shadow: 2px 5px 10px #111;
    transition: all .3s;
  }
  
  .router-link-active:hover {
    background-color: #f66436;
    border-radius: 7px;
    box-shadow: 2px 5px 20px #111;
    transform: translateY(-1px);
  }
  
  .search-input {
    background: transparent;
    border: none;
    border-radius: 0;
    border-bottom: 2px solid #999;
    transition: all .4s;
  }
  
  .search-input:focus {
    background: transparent;
    box-shadow: none;
    border-bottom: 2px solid #dc3545;
  }
  
  .search-button {
    border-radius: 50%;
    padding: 10px 16px;
    transition: all .4s;
  }
  
  .search-button:hover {
    background-color: #eee;
    transform: translateY(-1px);
  }
  
  .icon-parent {
    position: relative;
  }
  
  .icon-bullet::after {
    content: "";
    position: absolute;
    top: 7px;
    left: 15px;
    height: 12px;
    width: 12px;
    background-color: #f44336;
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      position: static;
      height: auto;
    }
  
    .top-navbar {
      position: static;
    }
  }
  /* end of navbar */
  
  /* cards */
  .card-common {
    box-shadow: 1px 2px 5px #999;
    transition: all .4s;
  }
  
  .card-common:hover {
    box-shadow: 2px 3px 15px #999;
    transform: translateY(-1px);
  }

</style>