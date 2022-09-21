
//create
var courseName = document.getElementById("courseName");
var courseCat = document.getElementById("courseCat");
var coursePrice = document.getElementById("coursePrice");
var courseDesc = document.getElementById("courseDesc");
var addBtn = document.getElementById("click");
var data = document.getElementById("data");
var nameAlert = document.getElementById("nameAlert");

var currentIndex;
var courses;
if(localStorage.getItem("coursesList")== null){
    courses = [];
}
else {
    courses = JSON.parse(localStorage.getItem("coursesList"));//get data from local storage and turn it to object of array by JSON.parse()
    displayData();
}
//Delete All
deleteBtn.onclick = function(){
    localStorage.removeItem('coursesList');
    courses=[];
    data.innerHTML="";
}
//Add Course
addBtn.onclick = function(){
    if(addBtn.innerHTML =="Add Course"){
        addCourse();
        
    } else {
        updateCourse();
        addBtn.innerHTML ="Add Course";
    }
    displayData();
    clear();
}
function addCourse(){
    var course ={
        name : courseName.value,
        cat : courseCat.value,
        price : coursePrice.value,
        desc : courseDesc.value
    };
    courses.push(course);
    localStorage.setItem("coursesList", JSON.stringify(courses));

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
}
function displayData(){
    //read
    var result ="";
    for (let i=0; i<courses.length; i++){
        result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].cat}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td>
               <button onclick="getCourseData(${i})" class="btn btn-outline-info">update</button>
               <button onclick="deleteCourse(${i})" class="btn btn-outline-danger">delete</button>
            </td>
        </tr>`
    }
    data.innerHTML= result;
}
function clear(){
    // this to clear form after adding to the table
    courseName.value = " ";
    courseCat.value = " ";
    coursePrice.value = " ";
    courseDesc.value = " ";
}
function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
            courses.splice(index,1),
            localStorage.setItem("coursesList", JSON.stringify(courses)),
            displayData()
          )
        }
      })
}
function search(e){
    var result ="";
    for (let i=0; i<courses.length; i++){
        if(courses[i].name.toLowerCase().includes(e.toLowerCase())){
            result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].cat}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td>
               <button onclick="updateCourse(${i})" class="btn btn-outline-info">update</button>
               <button onclick="deleteCourse(${i})" class="btn btn-outline-danger">delete</button>
            </td>
        </tr>`
        }
        
    }
    data.innerHTML= result;
}
function getCourseData(index){
    courseName.value = courses[index].name;
    courseCat.value = courses[index].cat;
    coursePrice.value = courses[index].price;
    courseDesc.value = courses[index].desc;
    addBtn.innerHTML="Update Course";
    currentIndex=index;
}
function updateCourse(){
    var course ={
        name : courseName.value,// value get after clicking on add course
        cat : courseCat.value,
        price : coursePrice.value,
        desc : courseDesc.value
    };
    courses[currentIndex].name = course.name;
    courses[currentIndex].cat = course.cat;
    courses[currentIndex].price = course.price;
    courses[currentIndex].desc = course.desc;
    localStorage.setItem("coursesList", JSON.stringify(courses));
}
courseName.onkeyup = function(){
    var namePattern = /^[A-Z][a-z]{2,8}$/;
    if(namePattern.test(courseName.value)){
        addBtn.removeAttribute("disabled");
        courseName.classList.remove("is-invalid"); 
        
        courseName.classList.add("is-valid");
        nameAlert.classList.remove("d-block")
        nameAlert.classList.add("d-none");
    } 
    else if (namePattern.test(courseName.value) == false){
        addBtn.setAttribute("disabled","disabled");
        courseName.classList.replace("is-valid","is-invalid");
        nameAlert.classList.remove("d-none");
        nameAlert.classList.add("d-block");
    }
}