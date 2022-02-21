# lucca-front / icons

## How to update icons

- Go to icomoon.io app
- Click "import icons" and load lucca-front/packages/icons/selection.json
- Drag and drop new icons in Lucca-Icons set
- Click "Generate Font"
- Add a string in the ligature field (fi) of each new icon. This string will be used as <span aria-hidden="true" class="lucca-icon">your_string</span>
- Click download
- Replace folder "lucca-front/packages/icons/font" and lucca-front/packages/icons/selection.json by new ones in the download zip
- Upload new front on cdn
- Update font mapping : "lucca-front/packages/icons/src/_mapping.scss"
- Update font mapping : "lucca-front/packages/icons/icons-list.js"
- Push it!
