function Column(id, name) {
	var self = this;
	
	this.id = id;
    this.name = name || 'Brak nazwy';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnDelete = $('<button class="btn-delete">- delete </button>'); //usuń kolumnę
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnAddCard = $('<button class="column-add-card">+ add task</button>');

		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt("Podaj nazwę karty");
			event.preventDefault();
			$.ajax({
			    url: baseUrl + '/card',
			    method: 'POST',
			    data: {
			    name: cardName,
			    bootcamp_kanban_column_id: self.id
			    },
			    success: function(response) {
			        var card = new Card(response.id, cardName);
			        self.createCard(card);
			    }
			});
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnDelete).append(columnTitle).append(columnAddCard).append(columnCardList);
		return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function(response){
        self.element.remove();
      }
    });
 }
};