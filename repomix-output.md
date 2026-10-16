This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/.env*, package-lock.json
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
````
public/
  favicon.svg
  icons.svg
src/
  assets/
    hero.png
    vite.svg
  data/
    programs.ts
  utils/
    curatorEngine.ts
    ticketPrinter.ts
  App.tsx
  index.css
  main.tsx
.env.example
.gitignore
eslint.config.js
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
````

# Files

## File: public/favicon.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
````

## File: public/icons.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
````

## File: src/assets/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
````

## File: src/data/programs.ts
````typescript
export interface FilmEntry {
  title: string;
  director: string;
  year: number;
  durationMin: number;
  country: string;
  format: string;
  tagline: string;
  posterUrl?: string;
  genres?: string[];
}

export interface DoubleFeatureProgram {
  id: string;
  cycleTitle: string;
  themeAxis: string;
  curatorNote: string;
  moodBadge: string;
  filmA: FilmEntry;
  filmB: FilmEntry;
}

export interface TicketTheme {
  id: string;
  name: string;
  paperBg: string;
  inkPrimary: string;
  inkAccent: string;
  borderInk: string;
}

export const TICKET_THEMES: TicketTheme[] = [
  {
    id: 'ivory-crimson',
    name: 'Marfil & Carmesí (Cineteca Bologna)',
    paperBg: '#F6F1E3',
    inkPrimary: '#1C1917',
    inkAccent: '#991B1B',
    borderInk: '#44403C',
  },
  {
    id: 'rose-noir',
    name: 'Rosa Papel & Tinta Negra (París 68)',
    paperBg: '#F5E1DA',
    inkPrimary: '#18181B',
    inkAccent: '#831843',
    borderInk: '#3F3F46',
  },
  {
    id: 'amber-vintage',
    name: 'Ámbar Teatro & Azul Prusia',
    paperBg: '#F3E5AB',
    inkPrimary: '#0F172A',
    inkAccent: '#1E3A8A',
    borderInk: '#334155',
  },
  {
    id: 'midnight-gold',
    name: 'Gala Nocturna (Negro & Oro)',
    paperBg: '#18181B',
    inkPrimary: '#F4F4F5',
    inkAccent: '#F59E0B',
    borderInk: '#52525B',
  },
];

// Base curada de respuestas profundas e instantáneas para clásicos y géneros
export const CURATED_PAIRINGS: Record<string, Omit<DoubleFeatureProgram, 'id' | 'filmA'>> = {
  'il sorpasso': {
    cycleTitle: 'Euforia, Velocidad y el Vacío del Milagro Italiano',
    themeAxis: 'La máscara del vitalismo frente a la melancolía de una generación.',
    moodBadge: 'Commedia all\'italiana · Contrapunto',
    curatorNote:
      'Si te fascinó «Il Sorpasso», tu segunda función obligatoria es «La dolce vita» o «C\'eravamo tanto amati». Mientras Dino Risi filma la huida hacia adelante a 140 km/h por la Vía Aurelia para no pensar en el vacío, Ettore Scola recoge los pedazos de esa misma Italia años después, cuando la fiesta terminó y quedan los amigos frente a sus promesas rotas.',
    filmB: {
      title: "C'eravamo tanto amati",
      director: 'Ettore Scola',
      year: 1974,
      durationMin: 124,
      country: 'Italia',
      format: '35mm B&N / Color',
      tagline: 'Creíamos que íbamos a cambiar el mundo, pero el mundo nos cambió a nosotros.',
    },
  },
  'the game': {
    cycleTitle: 'Paranoia Arquitectónica y Pérdida del Control',
    themeAxis: 'Hombres poderosos atrapados en una puesta en escena diseñada para quebrarlos.',
    moodBadge: 'Neo-Noir & Suspenso Paranoico',
    curatorNote:
      'A quien disfruta «The Game» de Fincher no le alcanza otro thriller convencional: necesita «Seconds» (1966) de John Frankenheimer o «The Conversation» (1974) de Coppola. Ambas comparten esa atmósfera nocturna, paranoica y claustrofóbica donde un hombre metódico descubre que cada detalle de su vida cotidiana está siendo manipulado por una organización invisible.',
    filmB: {
      title: 'The Conversation',
      director: 'Francis Ford Coppola',
      year: 1974,
      durationMin: 113,
      country: 'EE.UU.',
      format: '35mm Technicolor',
      tagline: 'El mejor especialista en vigilancia de San Francisco descubre que él es el vigilado.',
    },
  },
  'barry lyndon': {
    cycleTitle: 'El Hombre como Pintura ante la Indiferencia del Destino',
    themeAxis: 'El ascenso social, el azar implacable y la decadencia filmada como un cuadro.',
    moodBadge: 'Drama Histórico · Puesta en Escena',
    curatorNote:
      'Después de la hipnosis visual de «Barry Lyndon», la pareja perfecta es «Il Gattopardo» (El Gatopardo) de Luchino Visconti. Si Kubrick retrata al oportunista que intenta infiltrarse en la aristocracia a punta de duelos y azar, Visconti filma desde adentro el crepúsculo de esa misma nobleza con una solemnidad visual irrepetible.',
    filmB: {
      title: 'Il Gattopardo',
      director: 'Luchino Visconti',
      year: 1963,
      durationMin: 186,
      country: 'Italia',
      format: '35mm Technirama',
      tagline: 'Para que todo siga igual, es necesario que todo cambie.',
    },
  },
  'el conformista': {
    cycleTitle: 'Geometría del Poder y Traición Moral',
    themeAxis: 'La cobardía íntima disfrazada de orden bajo luces y sombras expresionistas.',
    moodBadge: 'Autoral Europeo · Fotografía',
    curatorNote:
      'La luz de Vittorio Storaro y la estructura fragmentada de «Il Conformista» encuentran su espejo ideal en «Mephisto» (1981) de István Szabó. Ambas diseccionan el alma de un intelectual que pacta con el totalitarismo no por fanatismo ideológico, sino por el deseo patológico de encajar, ser aplaudido y pertenecer.',
    filmB: {
      title: 'Mephisto',
      director: 'István Szabó',
      year: 1981,
      durationMin: 144,
      country: 'Hungría / Alemania',
      format: '35mm',
      tagline: '¿Qué precio tiene el alma cuando el escenario exige aplaudir al poder?',
    },
  },
};
````

## File: src/utils/curatorEngine.ts
````typescript
import type { DoubleFeatureProgram, FilmEntry } from '../data/programs';

export interface SearchMovieResult {
  id: string;
  title: string;
  director: string;
  year: number;
  durationMin: number;
  country: string;
  posterUrl?: string;
}

export async function searchMoviesOnline(query: string): Promise<SearchMovieResult[]> {
  const clean = query.trim();
  if (!clean) return [];

  const firstChar = clean[0].toLowerCase().replace(/[^a-z0-9]/g, 'a') || 'a';
  const imdbUrl = `https://v3.sg.media-imdb.com/suggestion/${firstChar}/${encodeURIComponent(
    clean.toLowerCase()
  )}.json`;

  const res = await fetch(imdbUrl);
  if (!res.ok) {
    throw new Error('Error al conectar con el catálogo de IMDb.');
  }

  const data = await res.json();
  if (!Array.isArray(data.d)) return [];

  return data.d
    .filter((item: any) => item.qid === 'movie' || item.q === 'feature' || item.y)
    .slice(0, 8)
    .map((item: any) => ({
      id: String(item.id),
      title: String(item.l),
      director: item.s ? String(item.s) : 'Créditos en archivo',
      year: Number(item.y) || 2000,
      durationMin: 118,
      country: 'Internacional',
      posterUrl: item.i?.imageUrl,
    }));
}

export async function generateDoubleFeature(
  movie: SearchMovieResult
): Promise<DoubleFeatureProgram> {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();

  if (!apiKey) {
    throw new Error('Falta configurar VITE_GEMINI_API_KEY en tu archivo .env');
  }

  const prompt = `Actuá como el programador jefe de una filmoteca de prestigio internacional (como la Cineteca di Bologna, Film Forum o MUBI).
El usuario acaba de elegir como Primera Función la película: "${movie.title}" (Año: ${movie.year}, Referencia elenco/créditos: ${movie.director}).

Tu tarea:
1. Completar los datos reales de "${movie.title}" (su director real, país de origen, duración aproximada en minutos, formato ideal de proyección ej. "35mm Anamórfico" o "35mm B&N", y un tagline evocador en español).
2. Seleccionar UNA Segunda Función (Programa Doble) extraordinaria que dialogue profunda, estética, temática o emocionalmente con "${movie.title}". PROHIBIDO elegir secuelas directas o películas obvias de la misma franquicia; buscá un cruce de autor inteligente (puede ser de otra década o país) que enriquezca la experiencia de verlas la misma noche.
3. Escribir en "curatorNote" un párrafo apasionante en español (de 3 a 4 oraciones) explicando exactamente POR QUÉ estas dos películas funcionan juntas en una función doble.

Respondé ÚNICAMENTE con un objeto JSON válido (sin bloques markdown \`\`\`json) respetando esta estructura exacta:
{
  "cycleTitle": "Título poético del programa doble",
  "themeAxis": "Frase breve que resume el hilo conductor entre ambas obras",
  "moodBadge": "Etiqueta corta del tono (ej: Neo-Noir & Suspenso · 35mm)",
  "curatorNote": "Explicación profunda de por qué dialogan entre sí.",
  "filmA": {
    "title": "${movie.title}",
    "director": "Nombre real del director de la primera película",
    "year": ${movie.year},
    "durationMin": 120,
    "country": "País real",
    "format": "35mm Color",
    "tagline": "Frase breve y potente sobre la primera película"
  },
  "filmB": {
    "title": "Título de la segunda película recomendada",
    "director": "Nombre real del director de la segunda película",
    "year": 1975,
    "durationMin": 115,
    "country": "País real",
    "format": "35mm",
    "tagline": "Frase breve y potente sobre la segunda película"
  }
}`;

  // Usamos gemini-3.8-flash que es el modelo estándar de producción de AI Studio
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Error en Gemini API (Status ${response.status})`
    );
  }

  const json = await response.json();
  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!rawText) {
    throw new Error('El modelo no devolvió contenido.');
  }

  const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  const parsed = JSON.parse(cleanJson);

  const enrichedFilmA: FilmEntry = {
    ...parsed.filmA,
    posterUrl: movie.posterUrl,
  };

  return {
    id: `df-${Date.now()}`,
    cycleTitle: parsed.cycleTitle,
    themeAxis: parsed.themeAxis,
    moodBadge: parsed.moodBadge,
    curatorNote: parsed.curatorNote,
    filmA: enrichedFilmA,
    filmB: parsed.filmB,
  };
}
````

## File: src/utils/ticketPrinter.ts
````typescript
import type { DoubleFeatureProgram, TicketTheme } from '../data/programs';

export interface TicketCustomData {
  cinemaName: string;
  screeningDate: string;
  seatCode: string;
  serialNumber: string;
  theme: TicketTheme;
}

export function drawCinemaTicket(
  canvas: HTMLCanvasElement,
  program: DoubleFeatureProgram,
  custom: TicketCustomData
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = 1200;
  const H = 560;
  canvas.width = W;
  canvas.height = H;

  const { theme } = custom;

  // 1. Fondo oscuro de mesa alrededor del ticket para que resalten las muescas troqueladas
  ctx.fillStyle = '#0C0A09';
  ctx.fillRect(0, 0, W, H);

  const margin = 32;
  const tX = margin;
  const tY = margin;
  const tW = W - margin * 2;
  const tH = H - margin * 2;
  const stubX = tX + tW * 0.74; // Línea donde se corta el talón del acomodador

  // 2. Cuerpo de papel del boleto
  ctx.save();
  ctx.fillStyle = theme.paperBg;
  ctx.fillRect(tX, tY, tW, tH);

  // Textura sutil de fibra de papel e imprenta
  for (let i = 0; i < 3800; i++) {
    const px = tX + Math.random() * tW;
    const py = tY + Math.random() * tH;
    ctx.fillStyle =
      theme.id === 'midnight-gold'
        ? 'rgba(255,255,255,0.025)'
        : 'rgba(28, 25, 23, 0.035)';
    ctx.fillRect(px, py, 1.5, 1.5);
  }

  // 3. Muescas circulares troqueladas en las 4 esquinas y en la unión del talón
  const punchHole = (cx: number, cy: number, r: number) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#0C0A09';
    ctx.fill();
  };

  const cornerR = 22;
  punchHole(tX, tY, cornerR);
  punchHole(tX + tW, tY, cornerR);
  punchHole(tX, tY + tH, cornerR);
  punchHole(tX + tW, tY + tH, cornerR);
  // Muescas del corte troquelado
  punchHole(stubX, tY, 18);
  punchHole(stubX, tY + tH, 18);

  // 4. Marco interior doble estilo boleto antiguo
  const innerPad = 18;
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 2;
  ctx.strokeRect(
    tX + innerPad,
    tY + innerPad,
    stubX - tX - innerPad * 2,
    tH - innerPad * 2
  );

  // Línea punteada vertical de troquelado
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(stubX, tY + 22);
  ctx.lineTo(stubX, tY + tH - 22);
  ctx.stroke();
  ctx.restore();

  // 5. Encabezado del Cine (Lado Izquierdo Principal)
  const leftCenter = tX + (stubX - tX) / 2;
  const contentLeft = tX + 44;
  const contentRight = stubX - 44;

  ctx.fillStyle = theme.inkAccent;
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(
    `★  ${custom.cinemaName.toUpperCase()} · PROGRAMA DOBLE EN CONTINUADO  ★`,
    leftCenter,
    tY + 52
  );

  // Línea separadora superior
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 66);
  ctx.lineTo(contentRight, tY + 66);
  ctx.stroke();

  // Título del Ciclo
  ctx.fillStyle = theme.inkPrimary;
  ctx.font = 'italic 600 22px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(`Ciclo: «${program.cycleTitle}»`, leftCenter, tY + 96);

  // 6. Bloque FUNCIÓN 1 y FUNCIÓN 2
  const drawFilmBlock = (
    yStart: number,
    slotLabel: string,
    timeLabel: string,
    title: string,
    director: string,
    year: number,
    format: string,
    duration: number
  ) => {
    // Badge de horario
    ctx.fillStyle = theme.inkAccent;
    ctx.fillRect(contentLeft, yStart, 138, 26);
    ctx.fillStyle = theme.id === 'midnight-gold' ? '#09090B' : '#FAF8F5';
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${slotLabel} · ${timeLabel}`, contentLeft + 69, yStart + 17);

    // Formato y duración a la derecha
    ctx.textAlign = 'right';
    ctx.fillStyle = theme.borderInk;
    ctx.font = '400 12px "Space Mono", monospace';
    ctx.fillText(`${format} · ${duration} MIN`, contentRight, yStart + 18);

    // Título de la película
    ctx.textAlign = 'left';
    ctx.fillStyle = theme.inkPrimary;
    ctx.font = '700 36px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(title, contentLeft, yStart + 66);

    // Director y Año
    ctx.fillStyle = theme.inkAccent;
    ctx.font = 'italic 600 18px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(`Dirigida por ${director} (${year})`, contentLeft, yStart + 92);
  };

  drawFilmBlock(
    tY + 118,
    '1ª FUNCIÓN',
    '20:00 HS',
    program.filmA.title,
    program.filmA.director,
    program.filmA.year,
    program.filmA.format,
    program.filmA.durationMin
  );

  // Separador de Intervalo
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 236);
  ctx.lineTo(contentRight, tY + 236);
  ctx.stroke();

  ctx.fillStyle = theme.paperBg;
  ctx.fillRect(leftCenter - 110, tY + 226, 220, 20);
  ctx.fillStyle = theme.borderInk;
  ctx.font = '700 10px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('— INTERVALO DE 15 MINUTOS —', leftCenter, tY + 240);

  drawFilmBlock(
    tY + 258,
    '2ª FUNCIÓN',
    '22:00 HS',
    program.filmB.title,
    program.filmB.director,
    program.filmB.year,
    program.filmB.format,
    program.filmB.durationMin
  );

  // Pie del lado izquierdo
  ctx.strokeStyle = theme.borderInk;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 382);
  ctx.lineTo(contentRight, tY + 382);
  ctx.stroke();

  const totalMin = program.filmA.durationMin + program.filmB.durationMin + 15;
  ctx.textAlign = 'left';
  ctx.fillStyle = theme.inkPrimary;
  ctx.font = '700 12px "Space Mono", monospace';
  ctx.fillText(`FECHA: ${custom.screeningDate.toUpperCase()}`, contentLeft, tY + 412);

  ctx.textAlign = 'center';
  ctx.fillText(`DURACIÓN TOTAL: ${totalMin} MIN`, leftCenter, tY + 412);

  ctx.textAlign = 'right';
  ctx.fillStyle = theme.inkAccent;
  ctx.fillText(`UBICACIÓN: ${custom.seatCode.toUpperCase()}`, contentRight, tY + 412);

  // Sello circular de filmoteca abajo a la derecha del cuerpo principal
  ctx.save();
  ctx.translate(contentRight - 55, tY + 450);
  ctx.rotate(-0.12);
  ctx.strokeStyle = theme.inkAccent;
  ctx.lineWidth = 1.8;
  ctx.strokeRect(-75, -14, 150, 26);
  ctx.font = '700 10px "Space Mono", monospace';
  ctx.fillStyle = theme.inkAccent;
  ctx.textAlign = 'center';
  ctx.fillText('COPIA ARCHIVO 35MM', 0, 3);
  ctx.restore();

  ctx.textAlign = 'left';
  ctx.fillStyle = theme.borderInk;
  ctx.font = 'italic 400 14px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(
    `«${program.themeAxis.slice(0, 78)}${program.themeAxis.length > 78 ? '...' : ''}»`,
    contentLeft,
    tY + 455
  );

  // 7. Lado Derecho: Talón Troquelado del Acomodador (Stub)
  const stubCenter = stubX + (tX + tW - stubX) / 2;

  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(
    stubX + 18,
    tY + innerPad,
    tX + tW - stubX - 36,
    tH - innerPad * 2
  );

  ctx.textAlign = 'center';
  ctx.fillStyle = theme.inkAccent;
  ctx.font = '700 12px "Space Mono", monospace';
  ctx.fillText('TALÓN DE CONTROL', stubCenter, tY + 55);

  ctx.fillStyle = theme.inkPrimary;
  ctx.font = '700 28px "Space Mono", monospace';
  ctx.fillText(custom.seatCode.toUpperCase(), stubCenter, tY + 100);

  ctx.font = '400 11px "Space Mono", monospace';
  ctx.fillStyle = theme.borderInk;
  ctx.fillText(custom.screeningDate.toUpperCase(), stubCenter, tY + 125);

  // Resúmenes cortos en el talón
  ctx.fillStyle = theme.inkPrimary;
  ctx.font = '700 18px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('I. ' + program.filmA.title.slice(0, 20), stubCenter, tY + 185);
  ctx.fillText('II. ' + program.filmB.title.slice(0, 20), stubCenter, tY + 225);

  // Código de barras simulado estilo imprenta
  const barStartX = stubCenter - 82;
  const barY = tY + 280;
  let cursorX = barStartX;
  const pattern = [3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2];

  ctx.fillStyle = theme.inkPrimary;
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i] * 2.4;
    if (i % 2 === 0) {
      ctx.fillRect(cursorX, barY, w, 68);
    }
    cursorX += w + 2.5;
  }

  ctx.font = '700 12px "Space Mono", monospace';
  ctx.fillStyle = theme.inkAccent;
  ctx.fillText(`Nº ${custom.serialNumber}`, stubCenter, tY + 375);

  ctx.fillStyle = theme.borderInk;
  ctx.font = '400 10px "Space Mono", monospace';
  ctx.fillText('VÁLIDO PARA 2 FUNCIONES', stubCenter, tY + 435);
  ctx.fillText('CONSERVE ESTE BOLETO', stubCenter, tY + 452);

  ctx.restore();
}
````

## File: src/App.tsx
````typescript
import { useState, useEffect, useRef } from 'react';
import {
  Ticket,
  Search,
  Sparkles,
  Download,
  Clock,
  Quote,
  Palette,
  MapPin,
  Film,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  TICKET_THEMES,
  CURATED_PAIRINGS,
  type DoubleFeatureProgram,
  type TicketTheme,
} from './data/programs';
import {
  searchMoviesOnline,
  generateDoubleFeature,
  type SearchMovieResult,
} from './utils/curatorEngine';
import { drawCinemaTicket } from './utils/ticketPrinter';

const INITIAL_PROGRAM: DoubleFeatureProgram = {
  id: 'init-sorpasso',
  ...CURATED_PAIRINGS['il sorpasso'],
  filmA: {
    title: 'Il Sorpasso',
    director: 'Dino Risi',
    year: 1962,
    durationMin: 105,
    country: 'Italia',
    format: '35mm B&N',
    tagline: 'Un Lancia Aurelia, un feriado de agosto en Roma y dos opuestos en la ruta.',
  },
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchMovieResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isCurating, setIsCurating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedProgram, setSelectedProgram] =
    useState<DoubleFeatureProgram>(INITIAL_PROGRAM);
  const [ticketTheme, setTicketTheme] = useState<TicketTheme>(TICKET_THEMES[0]);
  const [cinemaName, setCinemaName] = useState<string>('Cineclub Lumière · Sala 1');
  const [screeningDate, setScreeningDate] = useState<string>('Viernes 20:00 HS');
  const [seatCode, setSeatCode] = useState<string>('FILA G · BUTACA 14');
  const [serialNumber, setSerialNumber] = useState<string>('00482-A');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || isCurating) return;
    drawCinemaTicket(canvasRef.current, selectedProgram, {
      cinemaName,
      screeningDate,
      seatCode,
      serialNumber,
      theme: ticketTheme,
    });
  }, [
    selectedProgram,
    cinemaName,
    screeningDate,
    seatCode,
    serialNumber,
    ticketTheme,
    isCurating,
  ]);

  const handleSelectMovieForDoubleFeature = async (movie: SearchMovieResult) => {
    setIsCurating(true);
    setErrorMsg(null);
    try {
      const newProgram = await generateDoubleFeature(movie);
      setSelectedProgram(newProgram);
      setSerialNumber(
        `${String(Math.floor(1000 + Math.random() * 9000)).padStart(5, '0')}-B`
      );
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error al generar la función doble.');
    } finally {
      setIsCurating(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setErrorMsg(null);

    try {
      const results = await searchMoviesOnline(searchQuery);
      setSearchResults(results);
      if (results.length > 0) {
        await handleSelectMovieForDoubleFeature(results[0]);
      } else {
        setErrorMsg('No se encontraron películas con ese título en IMDb.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al buscar la película.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleDownloadTicket = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `funcion-doble-${selectedProgram.filmA.title
      .toLowerCase()
      .replace(/\s+/g, '-')}.png`;
    link.href = canvasRef.current.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 flex flex-col">
      <header className="border-b border-stone-800/80 bg-[#0C0A09]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-950/70 border border-red-800/60 flex items-center justify-center text-amber-300">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-serif-cinema font-bold tracking-wide flex items-center gap-2">
                Double Feature
                <span className="text-[10px] font-mono-ticket uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  AI Filmoteca Curator
                </span>
              </h1>
              <p className="text-xs text-stone-400 hidden sm:block">
                Buscá cualquier película y el programador arma la segunda función ideal en tiempo real
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadTicket}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg shadow-amber-500/15 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Imprimir Boleto PNG</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-5">
          <section className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl">
            <span className="text-[11px] font-mono-ticket uppercase tracking-wider text-amber-400 block mb-1">
              Paso 1 · Catálogo Global IMDb
            </span>
            <h2 className="text-lg font-serif-cinema font-bold text-white mb-3">
              ¿Qué película viste y te gustó?
            </h2>

            <form onSubmit={handleSearch} className="relative flex gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Escribí cualquier película del mundo..."
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700 focus:border-amber-400 text-xs text-stone-100 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || isCurating}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs cursor-pointer transition-colors shrink-0"
              >
                {isSearching ? 'Buscando...' : 'Programar'}
              </button>
            </form>

            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="mt-3 space-y-1.5 max-h-64 overflow-y-auto pr-1 border-t border-stone-800 pt-3">
                <span className="text-[11px] text-stone-400 block">
                  Resultados en IMDb (clic para curar función doble):
                </span>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isCurating}
                    onClick={() => handleSelectMovieForDoubleFeature(item)}
                    className="w-full text-left p-2 rounded-xl bg-stone-950 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-500/50 flex items-center gap-3 transition-all cursor-pointer group"
                  >
                    {item.posterUrl ? (
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        className="w-8 h-12 object-cover rounded bg-stone-900 shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-12 rounded bg-stone-900 flex items-center justify-center shrink-0">
                        <Film className="w-4 h-4 text-stone-600" />
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-xs text-stone-100 truncate group-hover:text-amber-300">
                        {item.title} ({item.year})
                      </p>
                      <p className="text-[11px] text-stone-400 truncate">
                        {item.director}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Papel & Tinta del Boleto
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {TICKET_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTicketTheme(t)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    ticketTheme.id === t.id
                      ? 'border-amber-400 bg-stone-950 ring-2 ring-amber-400/20'
                      : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-stone-600 shrink-0"
                    style={{ backgroundColor: t.paperBg }}
                  />
                  <span className="text-xs font-medium text-stone-200 leading-tight">
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Personalizar Sala & Butaca
            </h2>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">
                Nombre del Cineclub / Sala
              </label>
              <input
                type="text"
                value={cinemaName}
                onChange={(e) => setCinemaName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Día y Hora</label>
                <input
                  type="text"
                  value={screeningDate}
                  onChange={(e) => setScreeningDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Fila y Butaca</label>
                <input
                  type="text"
                  value={seatCode}
                  onChange={(e) => setSeatCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 outline-none font-mono-ticket"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {isCurating ? (
            <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[420px]">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-3" />
              <h3 className="text-xl font-serif-cinema font-bold text-white">
                El programador está armando tu Función Doble...
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-md">
                Analizando la puesta en escena, el director y el tono de tu película para encontrar su pareja ideal en 35mm.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-6 space-y-5 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-[11px] font-mono-ticket uppercase text-amber-400 block">
                      {selectedProgram.moodBadge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif-cinema font-bold text-stone-100 mt-0.5">
                      {selectedProgram.cycleTitle}
                    </h2>
                  </div>
                  <span className="text-xs font-mono-ticket text-stone-400 flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {selectedProgram.filmA.durationMin +
                      selectedProgram.filmB.durationMin +
                      15}{' '}
                    min (con intervalo)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800">
                    <div className="flex items-center justify-between text-[10px] font-mono-ticket uppercase text-stone-400 mb-1">
                      <span>1ª Función (Tu Elección)</span>
                      <span>20:00 HS</span>
                    </div>
                    <h3 className="text-xl font-serif-cinema font-bold text-white">
                      {selectedProgram.filmA.title}
                    </h3>
                    <p className="text-xs text-amber-300/90 font-medium">
                      Dir. {selectedProgram.filmA.director} ({selectedProgram.filmA.year})
                    </p>
                    <p className="text-xs text-stone-400 mt-2 leading-snug">
                      {selectedProgram.filmA.tagline}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/20 border-2 border-amber-500/40 relative">
                    <div className="flex items-center justify-between text-[10px] font-mono-ticket uppercase text-amber-400 mb-1">
                      <span>2ª Función Recomendada</span>
                      <span>22:00 HS</span>
                    </div>
                    <h3 className="text-xl font-serif-cinema font-bold text-amber-200">
                      {selectedProgram.filmB.title}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium">
                      Dir. {selectedProgram.filmB.director} ({selectedProgram.filmB.year})
                    </p>
                    <p className="text-xs text-stone-300 mt-2 leading-snug">
                      {selectedProgram.filmB.tagline}
                    </p>
                  </div>
                </div>

                <div className="bg-stone-950/90 p-5 rounded-xl border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-ticket uppercase tracking-wider text-amber-400">
                    <Quote className="w-4 h-4" />
                    <span>Por qué funcionan juntas (Nota del Programador)</span>
                  </div>
                  <p className="text-stone-200 leading-relaxed font-serif-cinema text-[17px] italic">
                    {selectedProgram.curatorNote}
                  </p>
                </div>
              </div>

              <div className="bg-stone-950 border border-stone-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono-ticket uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Boleto Oficial de la Función Doble
                  </span>
                  <span className="text-[11px] font-mono-ticket text-stone-500">
                    SERIE #{serialNumber}
                  </span>
                </div>

                <canvas
                  ref={canvasRef}
                  className="w-full h-auto rounded-lg shadow-xl border border-stone-900"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
````

## File: src/index.css
````css
@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #0C0A09;
  }
  .font-serif-cinema {
    font-family: 'Cormorant Garamond', Georgia, serif;
  }
  .font-mono-ticket {
    font-family: 'Space Mono', monospace;
  }
}
````

## File: src/main.tsx
````typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
````

## File: .env.example
````
VITE_GEMINI_API_KEY=pega_aqui_tu_api_key_de_google_ai_studio
````

## File: .gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.env
````

## File: eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
````

## File: index.html
````html
<!doctype html>
<html lang="es" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Double Feature | Curaduría de Funciones Dobles & Boletería</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#0C0A09] text-stone-100 antialiased selection:bg-red-800 selection:text-amber-100">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: package.json
````json
{
  "name": "double-feature",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "lucide-react": "^1.57.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.69.0",
    "vite": "^8.3.0"
  }
}
````

## File: README.md
````markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
````

## File: tsconfig.app.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
````

## File: tsconfig.json
````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## File: tsconfig.node.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
````

## File: vite.config.ts
````typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
````
