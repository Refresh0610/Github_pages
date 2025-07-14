// Select the elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');
const context = canvas.getContext('2d');
const startButton = document.getElementById('start-scanner'); // スキャン開始ボタン
const resetButton = document.getElementById('reset-scanner'); // リセットボタン

let animationFrameId; // アニメーションフレームのIDを保持する変数
let isScanning = true; // スキャンを続けるかどうかを制御するフラグ

// Function to start the video stream
function startVideo() {
    result.textContent = ""; // スキャン開始時に結果をクリア
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // Required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
        if (err.name === "NotReadableError") {
            result.textContent = "カメラが他のアプリケーションで使用中です。閉じてから再試行してください。";
        } else if (err.name === "AbortError") {
            result.textContent = "カメラアクセスのリクエストが中断されました。もう一度お試しください。";
        } else if (err.name === "NotAllowedError") {
            result.textContent = "カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。";
        } else if (err.name === "NotFoundError") {
            result.textContent = "カメラデバイスが見つかりません。接続を確認してください。";
        } else if (err.name === "SecurityError") {
            result.textContent = "HTTPS環境で実行してください。";
        } else {
            result.textContent = "カメラの起動中にエラーが発生しました。";
        }
    });
}

// Function to scan the video feed for QR codes
function tick() {
    if (!isScanning) return; // スキャンが停止されている場合は何もしない
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.hidden = false;
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
        if (code) {
            result.textContent = `QR Code Data: ${code.data}`;
            const url = code.data;
        
            // URLがwwwから始まるかどうかを確認
            const urlPattern = /^https?:\/\/www\./; // httpまたはhttpsで始まり、www.が続く
            if (urlPattern.test(url)) {
                window.open(url, '_blank'); // URLを新しいタブで開く
            } else {
                result.textContent = "QRコードが検出されましたが、URLが有効ではありません（'www'で始まる必要があります）。";
            }
        } else {
            result.textContent = "No QR code detected.";
        }
    }
    requestAnimationFrame(tick);
}

// スキャナをリセットする関数
function resetScanner() {
    isScanning = false; // スキャンを停止し、次のスキャンを無効化
    result.textContent = ""; // 結果表示をクリア
    isScanning = true; // スキャンを再開するためのフラグを設定
    if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop()); // カメラのストリームを停止
    }
    video.srcObject = null; // ビデオソースをクリア
    canvas.hidden = true; // キャンバスを非表示にする
}

startButton.addEventListener('click', startVideo); // スキャン開始ボタンにイベントリスナーを追加
resetButton.addEventListener('click', resetScanner); // リセットボタンにイベントリスナーを追加