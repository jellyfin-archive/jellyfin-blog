---
title: 'Downloads'
subtitle: 'You can download the latest releases of Jellyfin Server below!'
date: 2019-12-08T00:00:00-00:00
justify: 'center'
---

<div class="text-container">
    <h3 class="page__main__title">Stable or Unstable?</h3>
    <p>Generally, if you're a new user or value stability use the stable version. It won't change
        very often. If you want to help test the latest improvements and features and can handle some occasional
        breakage, use the unstable version. Always back up your existing configuration before testing unstable releases.</p>
    <div class="docker">
        <h4>Docker</h4>
        <p>Run Jellyfin in Docker. Example commands store data in "/srv/jellyfin" and assume your media is stored under
            "/media".</p>
        <p>
            <div class="button button__accent" id="docker_stable_button">Stable</div>
            <div class="button button__accent" id="docker_nightly_button">Unstable</div>
            <a href="https://hub.docker.com/r/jellyfin/jellyfin/" class="button button__accent">Docker Hub</a>
        </p>
        <script type="text/javascript">
            document.getElementById("docker_stable_button").onclick = function () {
                if (document.getElementById("docker_nightly").style.display == 'block') {
                    document.getElementById("docker_nightly").style.display = "none";
                }
                if (document.getElementById("docker_stable").style.display == 'none') {
                    document.getElementById("docker_stable").style.display = "block";
                } else {
                    document.getElementById("docker_stable").style.display = "none";
                }
            }
            document.getElementById("docker_nightly_button").onclick = function () {
                if (document.getElementById("docker_stable").style.display == 'block') {
                    document.getElementById("docker_stable").style.display = "none";
                }
                if (document.getElementById("docker_nightly").style.display == 'none') {
                    document.getElementById("docker_nightly").style.display = "block";
                } else {
                    document.getElementById("docker_nightly").style.display = "none";
                }
            }
        </script>
        <div id="docker_stable" style="display:none;">
            <pre><code>docker pull jellyfin/jellyfin:latest
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:latest</pre>
            </code>
        </div>
        <div id="docker_nightly" style="display:none;">
            <pre><code>docker pull jellyfin/jellyfin:unstable
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:unstable</pre>
            </code>
        </div>
    </div>
    <div class="debian">
        <h4>Debian and Ubuntu</h4>
        <p>Install Jellyfin via our Apt repository or via manual archives (.deb).</p>
        <p>
            <div class="button button__accent" id="deb_repo_stable_button">Stable</div>
            <div class="button button__accent" id="deb_repo_nightly_button">Unstable</div>
            <a href="https://repo.jellyfin.org/releases/server/debian/versions" class="button button__accent">All Debian
                Versions</a>
            <a href="https://repo.jellyfin.org/releases/server/ubuntu/versions" class="button button__accent">All Ubuntu
                Versions</a>
        </p>
        <script type="text/javascript">
            document.getElementById("deb_repo_stable_button").onclick = function () {
                if (document.getElementById("deb_repo_nightly").style.display == 'block') {
                    document.getElementById("deb_repo_nightly").style.display = "none";
                }
                if (document.getElementById("deb_repo_stable").style.display == 'none') {
                    document.getElementById("deb_repo_stable").style.display = "block";
                } else {
                    document.getElementById("deb_repo_stable").style.display = "none";
                }
            }
            document.getElementById("deb_repo_nightly_button").onclick = function () {
                if (document.getElementById("deb_repo_stable").style.display == 'block') {
                    document.getElementById("deb_repo_stable").style.display = "none";
                }
                if (document.getElementById("deb_repo_nightly").style.display == 'none') {
                    document.getElementById("deb_repo_nightly").style.display = "block";
                } else {
                    document.getElementById("deb_repo_nightly").style.display = "none";
                }
            }
        </script>
        <div id="deb_repo_stable" style="display:none;">
            <pre><code>sudo apt install curl gnupg
curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/jellyfin.gpg
RELEASE=$( hash pop-upgrade 2> /dev/null && echo Ubuntu || lsb_release --id --short )
echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/"${RELEASE,,}" $( lsb_release --codename --short ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
sudo apt update
sudo apt install jellyfin</code></pre>
        <p><i>Note:</i> The fourth command should give you output similar to <code>deb [arch=(architecture)] https://repo.jellyfin.org/(distribution) (release) main"</code>. We support <code>amd64</code>, <code>armhf</code>, and <code>arm64</code> for architectures, <code>debian</code> and <code>ubuntu</code> for distributions, <code>buster</code> and <code>bullseye</code> for Debian releases and <code>bionic</code>, <code>focal</code>, <code>impish</code> and <code>jammy</code> for Ubuntu releases. If you see something different in your output, you might need to manually modify it. Use the closest equivalent Debian or Ubuntu version instead.</p>
        <p>Once installed, Jellyfin will be running as a service. Manage it with <pre><code>sudo systemctl {action} jellyfin.service</code></pre> or <pre><code>sudo service jellyfin {action}</code></pre></p>
        </div>
        <div id="deb_repo_nightly" style="display:none;">
            <pre><code>sudo apt install curl gnupg
curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/jellyfin.gpg
echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main unstable" | sudo tee /etc/apt/sources.list.d/jellyfin.list
sudo apt update
sudo apt install jellyfin</code></pre>
        <p><i>Note:</i> The third command should give you output similar to <code>deb [arch=(architecture)] https://repo.jellyfin.org/(distribution) (release) main"</code>. We support <code>amd64</code>, <code>armhf</code>, and <code>arm64</code> for architectures, <code>debian</code> and <code>ubuntu</code> for distributions, <code>buster</code> and <code>bullseye</code> for Debian releases and <code>bionic</code>, <code>focal</code>, <code>impish</code> and <code>jammy</code> for Ubuntu releases. If you see something different in your output, you might need to manually modify it. Use the closest equivalent Debian or Ubuntu version instead.</p>
        <p><i>Note:</i> Both the <code>main</code> and <code>unstable</code> are needed as the <code>jellyfin-ffmpeg</code> package is only in the <code>main</code> component.</p>
        <p>Once installed, Jellyfin will be running as a service. Manage it with <pre><code>sudo systemctl {action} jellyfin.service</code></pre> or <pre><code>sudo service jellyfin {action}</code></pre></p>
        </div>
    </div>
    <div class="arch">
        <h4>Arch Linux</h4>
        <p>Install Jellyfin via the Arch User Repository.</p>
        <p>
            <div class="button button__accent" id="arch_aur_stable_button">Stable</div>
            <div class="button button__accent" id="arch_aur_nightly_button">Unstable</div>
            <a href="https://aur.archlinux.org/packages/?K=jellyfin" class="button button__accent">AUR</a>
        </p>
        <script type="text/javascript">
            document.getElementById("arch_aur_stable_button").onclick = function () {
                if (document.getElementById("arch_aur_nightly").style.display == 'block') {
                    document.getElementById("arch_aur_nightly").style.display = "none";
                }
                if (document.getElementById("arch_aur_stable").style.display == 'none') {
                    document.getElementById("arch_aur_stable").style.display = "block";
                } else {
                    document.getElementById("arch_aur_stable").style.display = "none";
                }
            }
            document.getElementById("arch_aur_nightly_button").onclick = function () {
                if (document.getElementById("arch_aur_stable").style.display == 'block') {
                    document.getElementById("arch_aur_stable").style.display = "none";
                }
                if (document.getElementById("arch_aur_nightly").style.display == 'none') {
                    document.getElementById("arch_aur_nightly").style.display = "block";
                } else {
                    document.getElementById("arch_aur_nightly").style.display = "none";
                }
            }
        </script>
        <div id="arch_aur_stable" style="display:none;">
            <pre><code>git clone https://aur.archlinux.org/jellyfin.git
cd jellyfin
makepkg -si</code></pre>
        </div>
        <div id="arch_aur_nightly" style="display:none;">
            <pre><code>git clone https://aur.archlinux.org/jellyfin-git.git
cd jellyfin-git
makepkg -si</code></pre>
        </div>
    </div>
    <div class="gentoo">
        <h4>Gentoo Linux</h4>
        <p>Install Jellyfin via the Gentoo Repository.</p>
        <p>
            <div class="button button__accent" id="gentoo_stable_button">Stable</div>
        </p>
        <script type="text/javascript">
            document.getElementById("gentoo_stable_button").onclick = function () {
                if (document.getElementById("gentoo_stable").style.display == 'none') {
                    document.getElementById("gentoo_stable").style.display = "block";
                } else {
                    document.getElementById("gentoo_stable").style.display = "none";
                }
            }
        </script>
        <div id="gentoo_stable" style="display:none;">
            <pre><code>emerge www-apps/jellyfin</code></pre>
        <p>Once installed, Jellyfin will be running as a service. Manage it with <pre><code>sudo systemctl {action} jellyfin.service</code></pre> or <pre><code>sudo rc-service jellyfin {action}</code></pre></p>
        </div>
    </div>
    <div class="fedora">
        <h4>Fedora and CentOS</h4>
        <p>RPM archives for both Fedora and CentOS are provided.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/fedora" class="button button__accent">Stable Fedora</a>
            <a href="https://repo.jellyfin.org/releases/server/centos" class="button button__accent">Stable CentOS</a>
            <a href="https://repo.jellyfin.org/releases/server/fedora/versions" class="button button__accent">All Fedora
                Versions</a>
            <a href="https://repo.jellyfin.org/releases/server/centos/versions" class="button button__accent">All CentOS
                Versions</a>
        </p>
    </div>
    <div class="linux">
        <h4>Generic Linux</h4>
        <p>Linux self-contained binary TAR archives (.tar.gz) are provided.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/linux/stable" class="button button__accent">Stable</a>
            <a href="https://repo.jellyfin.org/releases/server/linux/unstable" class="button button__accent">Unstable</a>
            <a href="https://repo.jellyfin.org/releases/server/linux/versions" class="button button__accent">All
                Versions</a>
        </p>
    </div>
    <div class="macos">
        <h4>MacOS</h4>
        <p>Both installers (.dmg) and manual ZIP archives (.tar.gz) are provided.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/macos/stable" class="button button__accent">Stable</a>
            <a href="https://repo.jellyfin.org/releases/server/macos/unstable" class="button button__accent">Unstable</a>
            <a href="https://repo.jellyfin.org/releases/server/macos/versions" class="button button__accent">All
                Versions</a>
        </p>
    </div>
    <div class="windows">
        <h4>Windows</h4>
        <p>Both installers (.exe) and manual ZIP archives (.zip) are provided.</p>
        <p>When using the installer, please ensure you <i>fully uninstall</i> any ZIP archive versions you may have
            installed, or you may get duplicate services.
            <p>
                <a href="https://repo.jellyfin.org/releases/server/windows/stable"
                    class="button button__accent">Stable</a>
                <a href="https://repo.jellyfin.org/releases/server/windows/unstable"
                    class="button button__accent">Unstable</a>
                <a href="https://repo.jellyfin.org/releases/server/windows/versions" class="button button__accent">All
                    Versions</a>
            </p>
    </div>
    <div class="portable">
        <h4>Portable</h4>
        <p>The portable version can be run on any system with a .NET Core runtime.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/portable/stable" class="button button__accent">Stable</a>
            <a href="https://repo.jellyfin.org/releases/server/portable/unstable"
                class="button button__accent">Unstable</a>
            <a href="https://repo.jellyfin.org/releases/server/portable/versions" class="button button__accent">All
                Versions</a>
        </p>
    </div>
