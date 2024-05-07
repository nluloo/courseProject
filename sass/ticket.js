document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.finish button').addEventListener('click', function() {
        // Получаем выбранные значения
        var selectedCinema = document.getElementById('selectCinema').value;
        var selectedFilm = document.getElementById('selectFilm').options[document.getElementById('selectFilm').selectedIndex].text;
        var selectedDate = document.getElementById('start').value;
        var selectedTime = document.querySelector('.containerBlock button.active').textContent;

        // Получаем выбранные места
        var selectedPlaces = [];
        document.querySelectorAll('.placeSeet.selected').forEach(function(place) {
            selectedPlaces.push({
                row: place.getAttribute('row'),
                index: place.getAttribute('index')
            });
        });

        // Создаем объект билета для каждого выбранного места
        var tickets = [];
        selectedPlaces.forEach(function(place) {
            var ticket = {
                cinema: selectedCinema,
                film: selectedFilm,
                date: selectedDate,
                time: selectedTime,
                place: place
            };
            tickets.push(ticket);
        });

        // Получаем массив билетов из localStorage
        var previousTickets = JSON.parse(localStorage.getItem('tickets')) || [];

        // Проверяем, нет ли среди выбранных билетов уже существующих в localStorage
        var existingTickets = previousTickets.some(function(existingTicket) {
            return tickets.some(function(newTicket) {
                return JSON.stringify(existingTicket) === JSON.stringify(newTicket);
            });
        });

        // Если хотя бы один из выбранных билетов уже существует, выводим сообщение об ошибке
        if (existingTickets) {
            alert('Невозможно заказать один и тот же билет повторно!');
            return; // Прекращаем выполнение функции
        }

        // Объединяем новые билеты с прошлыми и сохраняем в localStorage
        var allTickets = previousTickets.concat(tickets);
        localStorage.setItem('tickets', JSON.stringify(allTickets));

        // Оповещаем пользователя о сохранении
        alert('Билеты успешно сохранены!');
    });

    
});