const Header = () => {
	return (
		<>
		<nav className="app-header navbar navbar-expand bg-body">
        {/* <!--begin::Container--> */}
        <div className="container-fluid">

          {/* <!--begin::Navbar Search--> */}
          <form
            className="navbar-search d-none d-md-block ms-3"
            role="search"
            action="./pages/search-results.html"
          >
            <label for="navbar-search-input" className="visually-hidden">Search</label>
            <div className="navbar-search-field">
              <input
                type="search"
                id="navbar-search-input"
                name="q"
                className="form-control"
                placeholder="Search…"
                autocomplete="off"
              />
              <button className="navbar-search-submit" type="submit" aria-label="Submit search">
                <i className="bi bi-search" aria-hidden="true"></i>
              </button>
            </div>
          </form>
          {/* <!--end::Navbar Search--> */}

          {/* <!--begin::End Navbar Links--> */}
          <ul className="navbar-nav ms-auto">
            {/* <!--begin::Search (small screens: the field above is hidden, so link to the search page)--> */}
            <li className="nav-item d-md-none">
              <a className="nav-link" href="./pages/search-results.html" aria-label="Search">
                <i className="bi bi-search" aria-hidden="true"></i>
              </a>
            </li>
            {/* <!--end::Search--> */}

            {/* <!--begin::Fullscreen Toggle--> */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                data-lte-toggle="fullscreen"
                aria-label="Toggle fullscreen"
              >
                <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
                <i data-lte-icon="minimize" className="bi bi-fullscreen-exit d-none"></i>
              </a>
            </li>
            {/* <!--end::Fullscreen Toggle--> */}

            {/* <!--begin::Color Mode Toggle (#6010)--> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                id="bd-theme"
                aria-label="Toggle color scheme"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-sun-fill" data-lte-theme-icon="light"></i>
                <i className="bi bi-moon-fill d-none" data-lte-theme-icon="dark"></i>
                <i className="bi bi-circle-half d-none" data-lte-theme-icon="auto"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="bd-theme"
                style={{"--bs-dropdown-min-width": "8rem"}}
              >
                <li>
                  <button
                    type="button"
                    className="dropdown-item d-flex align-items-center"
                    data-bs-theme-value="light"
                    aria-pressed="false"
                  >
                    <i className="bi bi-sun-fill me-2"></i>
                    Light
                    <i className="bi bi-check-lg ms-auto d-none"></i>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item d-flex align-items-center"
                    data-bs-theme-value="dark"
                    aria-pressed="false"
                  >
                    <i className="bi bi-moon-fill me-2"></i>
                    Dark
                    <i className="bi bi-check-lg ms-auto d-none"></i>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item d-flex align-items-center active"
                    data-bs-theme-value="auto"
                    aria-pressed="true"
                  >
                    <i className="bi bi-circle-half me-2"></i>
                    Auto
                    <i className="bi bi-check-lg ms-auto d-none"></i>
                  </button>
                </li>
              </ul>
            </li>
            {/* <!--end::Color Mode Toggle--> */}

            {/* <!--begin::User Menu Dropdown--> */}
            <li className="nav-item dropdown user-menu">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <img
                  src="../../assets/img/hero.png"
                  className="user-image rounded-circle shadow"
                  alt="Alexander Pierce"
                />
                <span className="d-none d-md-inline">Alexander Pierce</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                {/* <!--begin::User Image--> */}
                <li className="user-header text-bg-primary">
                  <img
                    src="./assets/img/user2-160x160.jpg"
                    className="rounded-circle shadow"
                    alt="Alexander Pierce"
                  />
                  <p>
                    Alexander Pierce - Web Developer
                    <small>Member since Nov. 2023</small>
                  </p>
                </li>
                {/* <!--end::User Image--> */}
                {/* <!--begin::Menu Body--> */}
                <li className="user-body">
                  {/* <!--begin::Row--> */}
                  <div className="row">
                    <div className="col-4 text-center">
                      <a href="#">Followers</a>
                    </div>
                    <div className="col-4 text-center">
                      <a href="#">Sales</a>
                    </div>
                    <div className="col-4 text-center">
                      <a href="#">Friends</a>
                    </div>
                  </div>
                  {/* <!--end::Row--> */}
                </li>
                {/* <!--end::Menu Body--> */}
                {/* <!--begin::Menu Footer--> */}
                <li className="user-footer">
                  <a href="#" className="btn btn-outline-secondary">Profile</a>
                  <a href="#" className="btn btn-outline-danger float-end">Sign out</a>
                </li>
                {/* <!--end::Menu Footer--> */}
              </ul>
            </li>
            {/* <!--end::User Menu Dropdown--> */}
          </ul>
          {/* <!--end::End Navbar Links--> */}
        </div>
        {/* <!--end::Container--> */}
      </nav>
		</>
	)
}

export default Header;