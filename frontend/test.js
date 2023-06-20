document.getElementById('add-class-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var className = document.getElementById('class-name').value;
    var classDetails = document.getElementById('class-details').value;
    
    if (className !== '' && classDetails !== '') {
      addClass(className, classDetails);
      document.getElementById('class-name').value = '';
      document.getElementById('class-details').value = '';
    }
  });
  
  function addClass(className, classDetails) {
    var classList = document.getElementById('class-list');
    
    var listItem = document.createElement('li');
    var classBox = document.createElement('div');
    classBox.classList.add('class-box');
    
    var title = document.createElement('h3');
    title.textContent = className;
    classBox.appendChild(title);
    
    var details = document.createElement('p');
    details.textContent = classDetails;
    classBox.appendChild(details);
    
    listItem.appendChild(classBox);
    classList.appendChild(listItem);
  }