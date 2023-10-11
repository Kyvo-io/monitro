

const checkbox = document.getElementById('chk');

const lightTheme = {
  '--azul': '#28c8ef',
  '--azul-dark-mode': '#F2F2F2',
  '--branco-light-mode': '#0E1826'
}
const darkTheme = {
  '--azul': '#28c8ef',
  '--azul-dark-mode': '#0E1826',
  '--branco-light-mode': '#F2F2F2'
}


checkbox.addEventListener('change', function() {
  const isChecked = checkbox.checked
  isChecked ? changeTheme(lightTheme) : changeTheme (darkTheme)
})
function changeTheme(theme){
  for (let [property, value] of Object.entries(theme)){
    changeProperty(property, value)
  }
}
function changeProperty(property, value){
  document.documentElement.style.setProperty(property, value);
}

