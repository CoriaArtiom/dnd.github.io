    $(function () {

		$("#product li").draggable({
		
			// возвращение товара
			revert:true,
		
			// добавление прозрачности во время перетаскивания
			drag:function () {
				$(this).addClass("active");
				$(this).closest("#product").addClass("active");
			},
		
			// удаление css после драга
			stop:function () {
				$(this).removeClass("active").closest("#product").removeClass("active");
			}
		});

		$(".basket").droppable({
		
			activeClass:"active",
		
			hoverClass:"hover",
		
			// определение режима сбрасывания товара
			tolerance:"touch",
			drop:function (event, ui) {
		
				var basket = $(this),
						move = ui.draggable,
						itemId = basket.find("ul li[data-id='" + move.attr("data-id") + "']");
		
				// +1 если уже существует в корзине
				if (itemId.html() != null) {
					itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
				}
				else {
					// Иначе добавляем товар в корзину
					addBasket(basket, move);
		
					// И добавляем количество
					move.find("input").val(parseInt(move.find("input").val()) + 1);
				}
			}
		});

        // добавление нового элемента списка
        function addBasket(basket, move) {
			basket.find("ul").append('<li data-id="' + move.attr("data-id") + '">'
					+ '<span class="name">' + move.find("h3").html() + '</span>'
					+ '<input class="count" value="1" type="text">'
					+ '<button class="delete">&#10005;</button>');
		}


        // Функция удаления товара
        $(".basket ul li button.delete").live("click", function () {
			$(this).closest("li").remove();
		});

    });