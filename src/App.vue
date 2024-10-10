<template>
    <nav
        class="navbar navbar-expand-lg bg-primary"
        style="color: aliceblue !important"
        data-bs-autohide="true"
    >
        <div class="container-fluid">
            <div class="">
                <router-link style="text-decoration: none" to="/">
                    <a
                        class="navbar-brand"
                        style="color: aliceblue; font-weight: 500"
                    >
                        <img
                            src="./assets/cloudy.png"
                            alt="Logo"
                            width="30"
                            height="24"
                            class="d-inline-block align-text-top"
                        />
                        Weather Graph
                    </a>
                </router-link>
            </div>
            <button
                class="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                    <li class="nav-item">
                        <router-link style="text-decoration: none" to="/">
                            <a class="nav-link"
                                ><i class="bi bi-geo"></i> Current</a
                            >
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link style="text-decoration: none" to="/hourly">
                            <a class="nav-link"
                                ><i class="bi bi-hourglass-split"></i> Hourly</a
                            >
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link style="text-decoration: none" to="/daily">
                            <a class="nav-link"
                                ><i class="bi bi-calendar-day"></i> Daily</a
                            >
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link
                            style="text-decoration: none"
                            to="/settings"
                        >
                            <a class="nav-link"
                                ><i class="bi bi-gear"></i> Settings</a
                            >
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link style="text-decoration: none" to="/about">
                            <a class="nav-link"
                                ><i class="bi bi-info-circle"></i> About</a
                            >
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view />
</template>
<script setup>
import { CheckLocationInLocalStorage } from "./utilities/utils.js";

CheckLocationInLocalStorage();

if (localStorage.getItem("temperatureUnit") === null) {
    localStorage.setItem("temperatureUnit", "celsius");
}

// Close the navbar when the user clicks outside of it
document.addEventListener("click", function (event) {
    if (!event.target.closest(".navbar")) {
        let navbar = document.querySelector(".navbar-collapse");
        if (navbar.classList.contains("show")) {
            navbar.classList.remove("show");
        }
    }
});
</script>
<style>
.nav-link {
    color: aliceblue !important;
    font-weight: 450 !important;
}

.navbar-toggler {
    color: aliceblue !important;
    background-color: aliceblue !important;
}
</style>
