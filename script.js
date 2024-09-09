
// script.js
$(document).ready(function() {
    // Function to fetch and display data
    function fetchData() {
        $.ajax({
            url: '/data',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var dataContainer = $('#data-container');
                dataContainer.empty(); // Clear existing content

                $.each(data, function(index, row) {
                    var div = $('<div>');
                    div.html('ID: ' + row.id + '  Name:  ' + row.name + '    E-Mail:  ' + row.email);
                    dataContainer.append(div);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });}
      // Set up the click event handler for the fetch button
      $('#fetch-data-button').on('click', function() {
        fetchData(); // Call the fetchData function when the button is clicked
    });

    $('#form').on('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        
        var formData = {
            name: $('#name').val(),
            email: $('#email').val()
        };
        
        $.ajax({
            url: '/add-data',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert(response)
                
            },
            error: function(xhr, status, error) {
                alert('Error adding data:', error);
            }
        });
    });

         // Delete data when the delete button is clicked
         $('#delete-button').on('click', function() {
            var userId = $('#delete-id').val(); // Get the ID from the input field
    
            if (userId) {
                $.ajax({
                    url: `/delete-user/${userId}`,
                    method: 'DELETE',
                    success: function(response) {
                        alert(response.message);
                        
                    },
                    error: function(xhr, status, error) {
                        alert('Error deleting user:', error);
                    }
                });
            } else {
                alert('Please enter an ID to delete.');
            }
        });
    
     // Update data when the update button is clicked
       $('#update-button').on('click', function() {
        var userId = $('#update-id').val(); // Get the ID from the input field
        var updatedName = $('#update-name').val(); // Get the new name
        var updatedemail = $('#update-email').val(); // Get the new age

        if (userId && updatedName && updatedemail) {
            $.ajax({
                url: `/update-user/${userId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ name: updatedName, email: updatedemail }),
                success: function(response) {
                    alert(response.message);
                    
                },
                error: function(xhr, status, error) {
                    console.error('Error updating user:', error);
                }
            });
        } else {
            alert('Please fill out all fields.');
        }
    });



});
