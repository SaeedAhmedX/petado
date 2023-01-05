<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-auto bg-light sticky-top">
        <div
          class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top"
        >
          <span class="d-block p-3 link-dark text-decoration-none">
            <i class="bi-bootstrap fs-1"></i>
          </span>
          <ul
            class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center"
          >
            <li class="nav-item">
              <NuxtLink
                to="/"
                class="nav-link py-3 px-2"
                title="Home"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Home"
              >
                <i class="bi-house fs-1 text-primary"></i>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                to="/requests"
                class="nav-link py-3 px-2"
                title="Your Requests"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Home"
              >
                <i class="bi-hourglass fs-1 text-primary"></i>
              </NuxtLink>
            </li>
            <!-- <li>
              <NuxtLink
                to="/work"
                class="nav-link py-3 px-2"
                title="Your Work"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Dashboard"
              >
                <i class="bi-person-workspace fs-1 text-primary"></i>
              </NuxtLink>
            </li> -->
          </ul>
          <div class="dropdown">
            <a
              id="dropdownUser3"
              href="#"
              class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi-person-circle h2"></i>
            </a>
            <ul
              class="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser3"
            >
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm p-3 min-vh-100 main-content-panel">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-content-panel {
  position: relative;
  padding-bottom: 100px !important;
}
</style>
