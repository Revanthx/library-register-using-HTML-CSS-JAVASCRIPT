$(document).ready(function () {
    var userData = [];
    var editingUser = null;

    $("#save-user").click(function () {
        $("#Register-Here")[0].reset();
        $("#staticBackdrop").modal("show");
        editingUser = null; 
    });

    $(document).on("click", ".modal-footer .btn-primary", function () {
        var firstName = $("#first-name").val();
        var lastName = $("#last-name").val();
        var department = $("#department").val();
        var gender = $("input[name='gender']:checked").val();
        var age = $("#age").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
    
        if (!firstName || !lastName || !department || !gender || !age) {
            alert("Please fill in all required fields.");
            return;
        }
    
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    
        if (!emailPattern.test(email)) {
            alert("Invalid email address. Please enter a valid email.");
            return;
        }
    
        if (!phonePattern.test(phone)) {
            alert("Invalid phone number. Please enter a valid phone number.");
            return;
        }
    
        if (editingUser) {
            
            editingUser.firstName = firstName;
            editingUser.lastName = lastName;
            editingUser.department = department;
            editingUser.gender = gender;
            editingUser.age = age;
            editingUser.phone = phone;
            editingUser.email = email;
    
            
            var $tableRow = $("#user-table tr").eq(editingUser.rowIndex);
            $tableRow.find("td:eq(0)").text(editingUser.firstName);
            $tableRow.find("td:eq(1)").text(editingUser.lastName);
            $tableRow.find("td:eq(2)").text(editingUser.department);
            $tableRow.find("td:eq(3)").text(editingUser.gender);
            $tableRow.find("td:eq(4)").text(editingUser.age);
            $tableRow.find("td:eq(5)").text(editingUser.phone);
            $tableRow.find("td:eq(6)").text(editingUser.email);
    
            
            $("#first-name").val(editingUser.firstName);
            $("#last-name").val(editingUser.lastName);
            $("#department").val(editingUser.department);
            $("input[name='gender'][value='" + editingUser.gender + "']").prop("checked", true);
            $("#age").val(editingUser.age);
            $("#phone").val(editingUser.phone);
            $("#email").val(editingUser.email);
    
            editingUser = null; 
        } else {
            
            userData.push({
                firstName: firstName,
                lastName: lastName,
                department: department,
                gender: gender,
                age: age,
                phone: phone,
                email: email,
            });
    
            var newRow = "<tr>";
            newRow += "<td>" + firstName + "</td>";
            newRow += "<td>" + lastName + "</td>";
            newRow += "<td>" + department + "</td>";
            newRow += "<td>" + gender + "</td>";
            newRow += "<td>" + age + "</td>";
            newRow += "<td>" + phone + "</td>";
            newRow += "<td>" + email + "</td>";
            newRow += '<td>';
            newRow += '<i class="bi bi-pencil-square edit-user" style="cursor: pointer; margin-right: 10px;"></i>';
            newRow += '<i class="bi bi-trash-fill delete-user" style="cursor: pointer;"></i>';
            newRow += '</td>';
            newRow += "</tr>";
    
            $("#user-table").append(newRow);
        }
    

        $("#Register-Here")[0].reset();
    
    
        $("#staticBackdrop").modal("hide");
    });

    $("#user-table").on("click", ".edit-user", function () {
        var rowIndex = $(this).closest("tr").index();
        var user = userData[rowIndex];
    
        var $tableRow = $(this).closest("tr");
    
        
        $("#first-name").val(user.firstName);
        $("#last-name").val(user.lastName);
        $("#department").val(user.department);
        $("input[name='gender'][value='" + user.gender + "']").prop("checked", true);
        $("#age").val(user.age);
        $("#phone").val(user.phone);
        $("#email").val(user.email);
    
        
        editingUser = {
            rowIndex: rowIndex,
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department,
            gender: user.gender,
            age: user.age,
            phone: user.phone,
            email: user.email,
        };

        var $saveEditedUserButton = $('<button type="button" id="save-edited" class="btn btn-primary-2">Update</button>');


$saveEditedUserButton.css({
    'background-color': 'green', 
    'color': 'white',            
});

$(".modal-footer .btn-primary").hide();
$(".modal-footer .btn-primary-2").replaceWith($saveEditedUserButton);

$saveEditedUserButton.click(function () {
    user.firstName = $("#first-name").val();
    user.lastName = $("#last-name").val();
    user.department = $("#department").val();
    user.gender = $("input[name='gender']:checked").val();
    user.age = $("#age").val();
    user.phone = $("#phone").val();
    user.email = $("#email").val();

    $tableRow.find("td:eq(0)").text(user.firstName);
    $tableRow.find("td:eq(1)").text(user.lastName);
    $tableRow.find("td:eq(2)").text(user.department);
    $tableRow.find("td:eq(3)").text(user.gender);
    $tableRow.find("td:eq(4)").text(user.age);
    $tableRow.find("td:eq(5)").text(user.phone);
    $tableRow.find("td:eq(6)").text(user.email);

    $saveEditedUserButton.hide();
    $(".modal-footer .btn-primary").show();

    $("#staticBackdrop").modal("hide");
});

$("#staticBackdrop").modal("show");
    });

    $("#user-table").on("click", ".delete-user", function () {
        var rowIndex = $(this).closest("tr").index();
        $(this).closest("tr").remove();
        userData.splice(rowIndex, 1);
    });
});
