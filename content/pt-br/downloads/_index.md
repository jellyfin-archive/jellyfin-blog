+++
title = "Downloads"
subtitle = "Você pode baixar as versões mais recentes do Jellyfin Server abaixo!"
date = "2019-12-08"
justify = "center"
+++

<div class="text-container">
    <h3 class="page__main__title">Stable ou Nightly?</h3>
    <p>Geralmente, se você é um novo usuário ou prefere estabilidade no software, use a versão Stable. Não vai atualizar muitas vezes. Se você quiser ajudar a testar as melhorias e os recursos mais recentes e puder lidar com algumas quebra e bugs, use a versão Nightly. Sempre faça backup da sua configuração existente antes de testar as versões Nightly.</p>
    <div class="docker">
        <h4>Docker</h4>
        <p>Execute o Jellyfin no Docker. Os comandos de exemplo armazenam dados em "/srv/jellyfin" e assumem que sua mídia está armazenada em "/media"</p>
        <p>
            <div class="button button__accent" id="docker_stable_button">Stable</div>
            <div class="button button__accent" id="docker_nightly_button">Nightly</div>
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
            <pre><code>docker pull jellyfin/jellyfin:nightly
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:nightly</pre>
            </code>
        </div>
    </div>
    <div class="debian">
        <h4>Debian e Ubuntu</h4>
        <p>Instale o Jellyfin através do nosso repositório Apt ou através de arquivos manuais (.deb).</p>
        <p><i>Nota:</i> O Jellyfin não é explicitamente empacotado para Linux Mint ou outros derivados do Debubuntu. Use a mais próxima versão equivalente do Debian ou Ubuntu, se os comandos abaixo gerarem erros.</p>
        <p>
            <div class="button button__accent" id="deb_repo_stable_button">Stable</div>
            <div class="button button__accent" id="deb_repo_nightly_button">Nightly</div>
            <a href="https://repo.jellyfin.org/releases/server/debian/versions" class="button button__accent">Todas a versões Debian</a>
            <a href="https://repo.jellyfin.org/releases/server/ubuntu/versions" class="button button__accent">Todas a versões Ubuntu</a>
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
            <pre><code>sudo apt install apt-transport-https
wget -O - https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo apt-key add -
echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
sudo apt update
sudo apt install jellyfin</code></pre>
        <p>Uma vez instalado, o Jellyfin estará sendo executado como um serviço. Gerencie-o com <pre><code>sudo systemctl {action} jellyfin.service</code></pre> ou <pre><code>sudo service jellyfin {action}</code></pre></p>
        </div>
        <div id="deb_repo_nightly" style="display:none;">
            <pre><code>sudo apt install apt-transport-https
wget -O - https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo apt-key add -
echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
sudo apt update
sudo apt install jellyfin-nightly</code></pre>
        <p>Uma vez instalado, o Jellyfin estará sendo executado como um serviço. Gerencie-o com <pre><code>sudo systemctl {action} jellyfin.service</code></pre> ou <pre><code>sudo service jellyfin {action}</code></pre></p>
        </div>
    </div>
    <div class="arch">
        <h4>Arch Linux</h4>
        <p>Instale o Jellyfin através do Arch User Repository (AUR).</p>
        <p>
            <div class="button button__accent" id="arch_aur_stable_button">Stable</div>
            <div class="button button__accent" id="arch_aur_nightly_button">Nightly</div>
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
    <div class="fedora">
        <h4>Fedora and CentOS</h4>
        <p>São fornecidos arquivos RPM para o Fedora e o CentOS.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/fedora" class="button button__accent">Stable Fedora</a>
            <a href="https://repo.jellyfin.org/releases/server/centos" class="button button__accent">Stable CentOS</a>
            <a href="https://repo.jellyfin.org/releases/server/fedora/versions" class="button button__accent">Todas a versões Fedora</a>
            <a href="https://repo.jellyfin.org/releases/server/centos/versions" class="button button__accent">Todas a versões CentOS</a>
        </p>
    </div>
    <div class="linux">
        <h4>Generic Linux</h4>
        <p>Linux self-contained binary TAR archives (.tar.gz) are provided.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/linux/stable" class="button button__accent">Stable</a>
            <a href="https://repo.jellyfin.org/releases/server/linux/nightly" class="button button__accent">Nightly</a>
            <a href="https://repo.jellyfin.org/releases/server/linux/versions" class="button button__accent">Todas a versões</a>
        </p>
    </div>
    <div class="macos">
        <h4>MacOS</h4>
        <p>Both installers (.dmg) and manual ZIP archives (.tar.gz) are provided.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/macos/stable" class="button button__accent">Stable</a>
            <a href="https://repo.jellyfin.org/releases/server/macos/nightly" class="button button__accent">Nightly</a>
            <a href="https://repo.jellyfin.org/releases/server/macos/versions" class="button button__accent">Todas a versões</a>
        </p>
    </div>
    <div class="windows">
        <h4>Windows</h4>
        <p>São fornecidos instaladores (.exe) e arquivos ZIP manuais (.zip).</p>
        <p>Ao usar o instalador, verifique se você <i>desinstalou completamente</i> qualquer versão de arquivo ZIP que você possa ter instalado ou poderá ficar com serviços duplicados.
            <p>
                <a href="https://repo.jellyfin.org/releases/server/windows/stable"
                    class="button button__accent">Stable</a>
                <a href="https://repo.jellyfin.org/releases/server/windows/nightly"
                    class="button button__accent">Nightly</a>
                <a href="https://repo.jellyfin.org/releases/server/windows/versions" class="button button__accent">Todas a versões</a>
            </p>
    </div>
    <div class="portable">
        <h4>Portátil</h4>
        <p>A versão portátil pode ser executada em qualquer sistema com um runtime do .NET Core.</p>
        <p>
            <a href="https://repo.jellyfin.org/releases/server/portable/stable" class="button button__accent">Stable</a>
            <a href="https://repo.jellyfin.org/releases/server/portable/nightly"
                class="button button__accent">Nightly</a>
            <a href="https://repo.jellyfin.org/releases/server/portable/versions" class="button button__accent">Todas a versões</a>
        </p>
    </div>
