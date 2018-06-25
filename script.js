    $(function () {

		$("#product li").draggable({
		
			// ����������� ������
			revert:true,
		
			// ���������� ������������ �� ����� ��������������
			drag:function () {
				$(this).addClass("active");
				$(this).closest("#product").addClass("active");
			},
		
			// �������� css ����� �����
			stop:function () {
				$(this).removeClass("active").closest("#product").removeClass("active");
			}
		});

		$(".basket").droppable({
		
			activeClass:"active",
		
			hoverClass:"hover",
		
			// ����������� ������ ����������� ������
			tolerance:"touch",
			drop:function (event, ui) {
		
				var basket = $(this),
						move = ui.draggable,
						itemId = basket.find("ul li[data-id='" + move.attr("data-id") + "']");
		
				// +1 ���� ��� ���������� � �������
				if (itemId.html() != null) {
					itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
				}
				else {
					// ����� ��������� ����� � �������
					addBasket(basket, move);
		
					// � ��������� ����������
					move.find("input").val(parseInt(move.find("input").val()) + 1);
				}
			}
		});

        // ���������� ������ �������� ������
        function addBasket(basket, move) {
			basket.find("ul").append('<li data-id="' + move.attr("data-id") + '">'
					+ '<span class="name">' + move.find("h3").html() + '</span>'
					+ '<input class="count" value="1" type="text">'
					+ '<button class="delete">&#10005;</button>');
		}


        // ������� �������� ������
        $(".basket ul li button.delete").live("click", function () {
			$(this).closest("li").remove();
		});

    });