+++
title = "How to Contribute"
subtitle = "Jellyfin is a community project, run by volunteers. We're always looking for additional help from anyone who is able."
date = "2019-12-08"
justify = "center"
+++

<p>If you're interesting in helping the Jellyfin project, there are a few different ways to contribute depending on your skills and availability. Of course, simply using Jellyfin, finding issues, and reporting them, are a major help to our project, even if none of these apply to you!</p>
						<p>
						<div class="buttons" style="text-align:center">
						<div class="button button__accent" id="developer_button">I'm a developer</div>
						<div class="button button__accent" id="translator_button">I know non-English languages</div>
						<div class="button button__accent" id="supporter_button">I'm neither</div>
						</div>
						</p>
						<script type="text/javascript">
							document.getElementById("developer_button").onclick = function() {
								if (document.getElementById("developer").style.display == 'block') {
									document.getElementById("translator").style.display = "none";
									document.getElementById("supporter").style.display = "none";
								}
								if (document.getElementById("developer").style.display == 'none') {
									document.getElementById("developer").style.display = "block";
									document.getElementById("translator").style.display = "none";
									document.getElementById("supporter").style.display = "none";
									document.getElementById("developer").scrollIntoView(true);
								} else {
									document.getElementById("developer").style.display = "none";
								}
							}
							document.getElementById("translator_button").onclick = function() {
								if (document.getElementById("translator").style.display == 'block') {
									document.getElementById("developer").style.display = "none";
									document.getElementById("supporter").style.display = "none";
								}
								if (document.getElementById("translator").style.display == 'none') {
									document.getElementById("translator").style.display = "block";
									document.getElementById("developer").style.display = "none";
									document.getElementById("supporter").style.display = "none";
									document.getElementById("translator").scrollIntoView(true);
								} else {
									document.getElementById("translator").style.display = "none";
								}
							}
							document.getElementById("supporter_button").onclick = function() {
								if (document.getElementById("supporter").style.display == 'block') {
									document.getElementById("developer").style.display = "none";
									document.getElementById("translator").style.display = "none";
								}
								if (document.getElementById("supporter").style.display == 'none') {
									document.getElementById("supporter").style.display = "block";
									document.getElementById("developer").style.display = "none";
									document.getElementById("translator").style.display = "none";
									document.getElementById("developer").scrollIntoView(true);
								} else {
									document.getElementById("supporter").style.display = "none";
								}
							}
						</script>
						<div id="developer" style="display:none;">
							<p>There's a couple ways to get involved with Jellyfin, depending on your skillset.
							<div class="buttons" style="text-align:center">
							<div class="button button__accent" id="backend_button">I'm a C# developer</div>
							<div class="button button__accent" id="frontend_button">I'm a JS developer</div>
							<div class="button button__accent" id="other_button">I'm another developer</div>
							</div>
							</p>
							<script type="text/javascript">
								document.getElementById("backend_button").onclick = function() {
									if (document.getElementById("backend").style.display == 'block') {
										document.getElementById("frontend").style.display = "none";
										document.getElementById("other").style.display = "none";
									}
									if (document.getElementById("backend").style.display == 'none') {
										document.getElementById("backend").style.display = "block";
										document.getElementById("frontend").style.display = "none";
										document.getElementById("other").style.display = "none";
										document.getElementById("backend").scrollIntoView(true);
									} else {
										document.getElementById("backend").style.display = "none";
									}
								}
								document.getElementById("frontend_button").onclick = function() {
									if (document.getElementById("frontend").style.display == 'block') {
										document.getElementById("backend").style.display = "none";
										document.getElementById("other").style.display = "none";
									}
									if (document.getElementById("frontend").style.display == 'none') {
										document.getElementById("frontend").style.display = "block";
										document.getElementById("backend").style.display = "none";
										document.getElementById("other").style.display = "none";
										document.getElementById("frontend").scrollIntoView(true);
									} else {
										document.getElementById("frontend").style.display = "none";
									}
								}
								document.getElementById("other_button").onclick = function() {
									if (document.getElementById("other").style.display == 'block') {
										document.getElementById("backend").style.display = "none";
										document.getElementById("frontend").style.display = "none";
									}
									if (document.getElementById("other").style.display == 'none') {
										document.getElementById("other").style.display = "block";
										document.getElementById("backend").style.display = "none";
										document.getElementById("frontend").style.display = "none";
										document.getElementById("other").scrollIntoView(true);
									} else {
										document.getElementById("other").style.display = "none";
									}
								}
							</script>
							<div id="backend" style="display:none;">
								<p>The main core of Jellyfin as well as its plugins are written in C#. You have a couple options to get started.
								<div class="buttons" style="text-align:center">
								<div class="button button__accent" id="b_bugfix_button">Fix some bugs</div>
								<div class="button button__accent" id="b_feature_button">Implement a new feature</div>
								</div>
								</p>
								<script type="text/javascript">
									document.getElementById("b_bugfix_button").onclick = function() {
										if (document.getElementById("b_bugfix").style.display == 'block') {
											document.getElementById("b_feature").style.display = "none";
										}
										if (document.getElementById("b_bugfix").style.display == 'none') {
											document.getElementById("b_bugfix").style.display = "block";
											document.getElementById("b_feature").style.display = "none";
											document.getElementById("b_bugfix").scrollIntoView(true);
										} else {
											document.getElementById("b_bugfix").style.display = "none";
										}
									}
									document.getElementById("b_feature_button").onclick = function() {
										if (document.getElementById("b_feature").style.display == 'block') {
											document.getElementById("b_bugfix").style.display = "none";
										}
										if (document.getElementById("b_feature").style.display == 'none') {
											document.getElementById("b_feature").style.display = "block";
											document.getElementById("b_bugfix").style.display = "none";
											document.getElementById("b_feature").scrollIntoView(true);
										} else {
											document.getElementById("b_feature").style.display = "none";
										}
									}
								</script>
								<div id="b_bugfix" style="display:none;">
									<p>There are always bugs to fix in Jellyfin. If you want to find an existing bug to fix, head over to the <a href="https://github.com/jellyfin/jellyfin/issues?q=is%3Aissue+is%3Aopen+label%3Abug" style="color:#fff">open Bug Issues page</a> on GitHub, and find one that interests you. If you find a bug that affects you already, it's a good candidate to fix as you should be quickly able to test it; otherwise, the bug report should list steps to reproduce the bug.</p>
									<p>Once you've found a bug you'd like to fix, head over to the <a href="https://github.com/jellyfin/jellyfin" style="color:#fff">GitHub page</a> for the server and begin hacking. Development documentation can be found on the <a href="../docs/" style="color:#fff">Documentation page</a>. When the fix is ready, feel free to propose it to other users in the issue to get them to help test as well.</p>
									<p>You should always develop bugfixes on a dedicated Git branch within your own Fork of Jellyfin (the fork+branch model). Once your bugfix is ready, submit a Pull Request on GitHub from your feature branch to the Master branch of the project. It will be reviewed and, when it passes review, accepted into Jellyfin.</p>
								</div>
								<div id="b_feature" style="display:none;">
									<p>New features for Jellyfin are generally implemented in one of two ways, depending on the complexity and scope of the feature.</p>
									<p>First, check out our <a href="https://features.jellyfin.org" style="color:#fff">Feature Requests tracker</a> and find something that looks interesting or useful to you. Please comment on the issue to indicate that you are working on it in order to let everyone know.</p>
									<p>Most well-requested features will have a tag; as a C# developer, those tagged as <b>"Server"</b> or <b>"Plugin"</b> are of the most interest to you. Select the option below based on the tag on the feature.
									<div class="buttons" style="text-align:center">
									<div class="button button__accent" id="b_f_server_button">Server</div>
									<div class="button button__accent" id="b_f_plugin_button">Plugin</div>
									</div>
									</p>
									<script type="text/javascript">
										document.getElementById("b_f_server_button").onclick = function() {
											if (document.getElementById("b_f_server").style.display == 'block') {
												document.getElementById("b_f_plugin").style.display = "none";
											}
											if (document.getElementById("b_f_server").style.display == 'none') {
												document.getElementById("b_f_server").style.display = "block";
												document.getElementById("b_f_plugin").style.display = "none";
												document.getElementById("b_f_server").scrollIntoView(true);
											} else {
												document.getElementById("b_f_server").style.display = "none";
											}
										}
										document.getElementById("b_f_plugin_button").onclick = function() {
											if (document.getElementById("b_f_plugin").style.display == 'block') {
												document.getElementById("b_f_server").style.display = "none";
											}
											if (document.getElementById("b_f_plugin").style.display == 'none') {
												document.getElementById("b_f_plugin").style.display = "block";
												document.getElementById("b_f_server").style.display = "none";
												document.getElementById("b_f_plugin").scrollIntoView(true);
											} else {
												document.getElementById("b_f_plugin").style.display = "none";
											}
										}
									</script>
									<div id="b_f_server" style="display:none;">
										<p>Features of this type should be implemented directly into the core server itself. Once you've found a feature you want to implement, head over to the <a href="https://github.com/jellyfin/jellyfin" style="color:#fff">GitHub page</a> for the server and begin hacking. Development documentation can be found on the <a href="../docs/" style="color:#fff">Documentation page</a>.</p>
										<p>You should always develop features on a dedicated Git branch within your own Fork of Jellyfin (the fork+branch model). Once your feature is ready, submit a Pull Request on GitHub from your feature branch to the Master branch of the project. It will be reviewed and, if it passes review, accepted into Jellyfin.</p>
									</div>
									<div id="b_f_plugin" style="display:none;">
										<p>Features of this type should be implemented as external plugins. Plugins help extend the functionality of Jellyfin without integrating the code into the main core. This lets users select the features they want and install them dynamically, without complicating the server as a whole. For developers, they also help keep the code clean and focused on the functionality, without worrying about the backend.</p>
										<p>Once you've found a feature you want to implement with a plugin, check out the <a href="https://github.com/jellyfin/jellyfin-plugin-template" style="color:#fff">Plugin Template repository</a> and clone this repository into a new project. Official plugins are named "jellyfin-plugin-mycoolname". You can use this template to get you started on writing the plugin. You may also want to consult the <a href="../docs/plugin-api/index.html" style="color:#fff">Jellyfin API documentation</a> to help learn the interfaces available.</p>
										<p>Once your plugin is working as expected, and all information filled out, publish your code to GitHub and <a href="https://matrix.to/#/#jellyfin-dev:matrix.org" style="color:#fff">contact the team on Matrix</a>. If your plugin passes our evaluation, we will add it to the official plugin catalogue, and can optionally transfer ownership of the plugin to the Jellyfin organization on GitHub.</p>
									</div>
								</div>
							</div>
							<div id="frontend" style="display:none;">
								<p>The primary Jellyfin WebUI is written primarily in Javascript. You have a couple options to get started.
								<div class="buttons" style="text-align:center">
								<div class="button button__accent" id="f_bugfix_button">Fix some bugs</div>
								<div class="button button__accent" id="f_feature_button">Implement a new feature</div>
								<div class="button button__accent" id="f_react_button">Help build the new React frontend</div>
								</div>
								</p>
								<script type="text/javascript">
									document.getElementById("f_bugfix_button").onclick = function() {
										if (document.getElementById("f_bugfix").style.display == 'block') {
											document.getElementById("f_feature").style.display = "none";
											document.getElementById("f_react").style.display = "none";
										}
										if (document.getElementById("f_bugfix").style.display == 'none') {
											document.getElementById("f_bugfix").style.display = "block";
											document.getElementById("f_feature").style.display = "none";
											document.getElementById("f_react").style.display = "none";
											document.getElementById("f_bugfix").scrollIntoView(true);
										} else {
											document.getElementById("f_bugfix").style.display = "none";
										}
									}
									document.getElementById("f_feature_button").onclick = function() {
										if (document.getElementById("f_feature").style.display == 'block') {
											document.getElementById("f_bugfix").style.display = "none";
											document.getElementById("f_react").style.display = "none";
										}
										if (document.getElementById("f_feature").style.display == 'none') {
											document.getElementById("f_feature").style.display = "block";
											document.getElementById("f_bugfix").style.display = "none";
											document.getElementById("f_react").style.display = "none";
											document.getElementById("f_feature").scrollIntoView(true);
										} else {
											document.getElementById("f_feature").style.display = "none";
										}
									}
									document.getElementById("f_react_button").onclick = function() {
										if (document.getElementById("f_react").style.display == 'block') {
											document.getElementById("f_feature").style.display = "none";
											document.getElementById("f_bugfix").style.display = "none";
										}
										if (document.getElementById("f_react").style.display == 'none') {
											document.getElementById("f_react").style.display = "block";
											document.getElementById("f_feature").style.display = "none";
											document.getElementById("f_bugfix").style.display = "none";
											document.getElementById("f_react").scrollIntoView(true);
										} else {
											document.getElementById("f_react").style.display = "none";
										}
									}
								</script>
								<div id="f_bugfix" style="display:none;">
									<p>There are always bugs to fix in Jellyfin. If you want to find an existing bug to fix, head over to the <a href="https://github.com/jellyfin/jellyfin-web/issues?q=is%3Aissue+is%3Aopen+label%3Abug" style="color:#fff">open Bug Issues page</a> on GitHub, and find one that interests you. If you find a bug that affects you already, it's a good candidate to fix as you should be quickly able to test it; otherwise, the bug report should list steps to reproduce the bug.</p>
									<p>Once you've found a bug you'd like to fix, head over to the <a href="https://github.com/jellyfin/jellyfin-web" style="color:#fff">GitHub page</a> for the WebUI and begin hacking. Development documentation can be found on the <a href="../docs/" style="color:#fff">Documentation page</a>. When the fix is ready, feel free to propose it to other users in the issue to get them to help test as well.</p>
									<p>You should always develop bugfixes on a dedicated Git branch within your own Fork of Jellyfin's WebUI (the fork+branch model). Once your bugfix is ready, submit a Pull Request on GitHub from your feature branch to the Master branch of the project. It will be reviewed and, if it passes review, accepted into Jellyfin.</p>
								</div>
								<div id="f_feature" style="display:none;">
									<p>First, check out our <a href="https://features.jellyfin.org" style="color:#fff">Feature Requests tracker</a> and find something that looks interesting or useful to you. Please comment on the issue to indicate that you are working on it in order to let everyone know.</p>
									<p>Most well-requested features will have a tag; as a Javascript developer, those tagged as <b>"Web UI"</b> are of the most interest to you.
									<p>Once you've found a feature you'd like to implement, head over to the <a href="https://github.com/jellyfin/jellyfin" style="color:#fff">GitHub page</a> for the server and begin hacking. Development documentation can be found on the <a href="../docs/" style="color:#fff">Documentation page</a>.</p>
									<p>You should always develop features on a dedicated Git branch within your own Fork of Jellyfin's WebUI (the fork+branch model). Once your feature is ready, submit a Pull Request on GitHub from your feature branch to the Master branch of the project. It will be reviewed and, if it passes review, accepted into Jellyfin.</p>
								</div>
								<div id="f_react" style="display:none;">
									<p>Jellyfin's planned next-generation Web UI and base for new apps, is based on React-Native. Head over to the <a href="https://github.com/jellyfin/jellyfin-react-client" style="color:#fff">project page</a> on GitHub for more information.</p>
								</div>
							</div>
							<div id="other" style="display:none;">
								<p>Jellyfin has several other sub-projects that use various languages. If any of these suit you, head over to the relevant project page and begin hacking.</p>
								<p><b>Java:</b> The <a href="https://github.com/jellyfin/jellyfin-androidtv" style="color:#fff">Android TV</a> and <a href="https://github.com/jellyfin/jellyfin-android" style="color:#fff">Android</a> apps are written in Java; Android also includes the main WebUI.</p>
								<p><b>Python:</b> The <a href="https://github.com/jellyfin/jellyfin-kodi" style="color:#fff">Kodi</a> client is written in Python.</p>
								<p><b>BrightScript:</b> The <a href="https://github.com/jellyfin/jellyfin-roku" style="color:#fff">Roku</a> client is written in BrightScript.</p>
								<p>Feel free to browse around the <a href="https://github.com/jellyfin" style="color:#fff">project page</a> for the full list of official sub-projects.</p>
							</div>
						</div>
						<div id="translator" style="display:none;">
							<p>Check our our <a href="https://translate.jellyfin.org/" style="color:#fff">Weblate instance</a> and start helping to translate strings to other languages! Logging in will require a <a href="https://github.com" style="color:#fff">GitHub</a> account.</p>
						</div>
						<div id="supporter" style="display:none;">
							<p>Even if you're not a developer or able to speak multiple languages, there's still lots of things you can do to help Jellyfin.
							<div class="buttons" style="text-align:center">
							<div class="button button__accent" id="s_document_button">Write documentation</div>
							<div class="button button__accent" id="s_troubleshoot_button">Help people troubleshoot</div>
							<div class="button button__accent" id="s_financier_button">Help pay for expenses</div>
							</div>
							<p>
							<script type="text/javascript">
								document.getElementById("s_document_button").onclick = function() {
									if (document.getElementById("s_document").style.display == 'block') {
										document.getElementById("s_troubleshoot").style.display = "none";
										document.getElementById("s_financier").style.display = "none";
									}
									if (document.getElementById("s_document").style.display == 'none') {
										document.getElementById("s_document").style.display = "block";
										document.getElementById("s_troubleshoot").style.display = "none";
										document.getElementById("s_financier").style.display = "none";
										document.getElementById("s_document").scrollIntoView(true);
									} else {
										document.getElementById("s_document").style.display = "none";
									}
								}
								document.getElementById("s_troubleshoot_button").onclick = function() {
									if (document.getElementById("s_troubleshoot").style.display == 'block') {
										document.getElementById("s_document").style.display = "none";
										document.getElementById("s_financier").style.display = "none";
									}
									if (document.getElementById("s_troubleshoot").style.display == 'none') {
										document.getElementById("s_troubleshoot").style.display = "block";
										document.getElementById("s_document").style.display = "none";
										document.getElementById("s_financier").style.display = "none";
										document.getElementById("s_troubleshoot").scrollIntoView(true);
									} else {
										document.getElementById("s_troubleshoot").style.display = "none";
									}
								}
								document.getElementById("s_financier_button").onclick = function() {
									if (document.getElementById("s_financier").style.display == 'block') {
										document.getElementById("s_document").style.display = "none";
										document.getElementById("s_troubleshoot").style.display = "none";
									}
									if (document.getElementById("s_financier").style.display == 'none') {
										document.getElementById("s_financier").style.display = "block";
										document.getElementById("s_document").style.display = "none";
										document.getElementById("s_troubleshoot").style.display = "none";
										document.getElementById("s_financier").scrollIntoView(true);
									} else {
										document.getElementById("s_financier").style.display = "none";
									}
								}
							</script>
							<div id="s_document" style="display:none;">
								<p>Documentation is simultaneously very important, but very neglected in a lot of projects. We want to be different, and you can help! If you come across anything that you think should be documented, such as how to do things, configuration steps, or just general helpful pointers, we welcome contributions to <a href="https://github.com/jellyfin/jellyfin-docs" style="color:#fff">our Documentation Repository</a>, visible <a href="../docs/" style="color:#fff">here</a>.
							</div>
							<div id="s_troubleshoot" style="display:none;">
								<p>We have a large and diverse userbase, with so many features that the combinations and configurations are almost endless. But as a volunteer-run project, the contributors can often be limited in the help they can provide. If you are well-versed in Jellyfin's operation, we welcome you to try to help troubleshoot problems your fellow users are having. Troubleshooting generally occurs in our <a href="https://matrix.to/#/#jellyfin:matrix.org" style="color:#fff">main</a> and <a href="https://matrix.to/#/#jellyfin-troubleshooting:matrix.org" style="color:#fff">troubleshooting</a> Matrix rooms, on <a href="https://reddit.com/r/jellyfin" style="color:#fff">our Reddit Subreddit</a>, and on <a href="https://forum.jellyfin.org" style="color:#fff">our Forum</a>. Hanging around those places and helping your fellow users, in a kind, courteous, and respectful manner, earns our eternal gratitude!</p>
							</div>
							<div id="s_financier" style="display:none;">
								<p>As a project, we generally don't like asking for donations - we're entirely volunteer-run and intend to keep Jellyfin free as in beer, as well as free as in speech, forever. We do not wish, support, nor intend donations to privilege any user's voice or priorities. That said, if you do want to help us cover some operating expenses like our VPS hosting, domains, developer licences, metadata API keys, and other incidental expenses, check out our <a href="https://opencollective.com/jellyfin" style="color:#fff">OpenCollective page</a> to donate. Our entire budget as well as all expenses are publicly visible there.
							</div>
						</div>
				</div>