function getParameterByName(a) {
  a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var b = new RegExp("[\\?&]" + a + "=([^&#]*)"),
    c = b.exec(location.search);
  return null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "));
}

//search an object name (name : key) and return 1st object.key of found object(s)

function findValueByPrefix(object, prefix) {
  for (var property in object) {
    if (
      object.hasOwnProperty(property) &&
      property.toString().startsWith(prefix)
    ) {
      return object[property];
    }
  }
}

//search an object name prefix (name : key) and return ALL object.keys of found object(s)

function makeArrayByPrefix(object, prefix) {
  let result = [];
  for (var property in object) {
    if (
      object.hasOwnProperty(property) &&
      property.toString().startsWith(prefix)
    ) {
      result.push(object[property]);
    }
  }
  console.log(result);
  return result;
}

//search an object name suffix (name : key) and return ALL object.keys of found object(s)

function makeArrayBySuffix(object, suffix) {
  let result = [];
  for (var property in object) {
    if (
      object.hasOwnProperty(property) &&
      property.toString().endsWith(suffix)
    ) {
      result.push(object[property]);
    }
  }
  console.log(result);
  return result;
}

// Build a drop down from an Array

function buildDropdown(elementID, arr) {
  // build a dropdown menu from an array of data

  let dropdownsource = document.getElementById(elementID);
  dropdownsource = "";
  var options = arr;
  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    dropdownsource.appendChild(el);
  }
}
