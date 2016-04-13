(function() {
	var $textX;
	var $textY;
	var socket;

	$(function() {
		$textX = $("#text-x");
		$textY = $("#text-y");

		// サーバーに接続
		socket = io.connect(location.origin);

		// DeviceOrientation Event
		window.addEventListener("deviceorientation", deviceorientationHandler);
	});

	// ジャイロセンサーの値が変化
	function deviceorientationHandler(event) {
		// 地面に対して水平を90としたいため調整
		// X軸
		var beta = Math.floor(event.beta + 90);
		
		// Y軸
		var gamma = Math.floor(event.gamma + 90);

		$textX.html("X : " + beta);
		$textY.html("Y : " + gamma);

		if(socket) {
			// サーバーへジャイロセンサーの値を送信
			socket.emit("servo", {
				angleX : beta,
				angleY : gamma
			});
		}
	}
})();
