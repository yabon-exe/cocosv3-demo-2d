
import { _decorator, Component, Node, Vec2, v2, v3, Color, Camera, Graphics, find, EventTouch, Canvas, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

/**
 * スマートフォンの画面タッチコントローラー
 */
@ccclass('TouchController')
export class TouchController extends Component {
    canvasUIT: UITransform = null;
    graphics: Graphics = null;
    camera: Camera = null;
    controllerLineStart: Vec2 = v2(0, 0);
    swipeVecBase: Vec2 = v2(0, 0);

    /**
    スワイプ中フラグ
    */
    @property
    swiping: boolean = false;

    /**
    スワイプベクトル
    */
    @property(Vec2)
    swipeVec: Vec2 = v2(0, 0);

    /**
    スワイプベクトルスケール
    */
    @property
    swipeScale = 0.2;

    /**
    スワイプベクトルの最大の長さ
    */
    @property
    swipeDistanceLimit = 500.0;

    /**
    スワイプラインスタート位置を更新する
    @param touchLocation 画面タッチ位置
    */
    resetLatestLocation(touchLocation: Vec2) {
        this.controllerLineStart = touchLocation;
    }

    /**
    スワイプラインを描画する（ぷにコン？みたいなもの）
    @param touchLocation 画面タッチ位置
    */
    drawSwipeLine() {
        this.graphics.clear();

        let distance = this.swipeVec.length();
        if (distance > this.swipeDistanceLimit) {
            // スワイプベクトルの最大値制限
            distance = this.swipeDistanceLimit;
        }
        let lineTo = v2(
            this.controllerLineStart.x + this.swipeVecBase.x,
            this.controllerLineStart.y + this.swipeVecBase.y
        );

        // スワイプライン描画
        this.graphics.lineWidth = distance;
        this.graphics.strokeColor = Color.WHITE;
        this.graphics.moveTo(this.controllerLineStart.x, this.controllerLineStart.y);
        this.graphics.lineTo(lineTo.x, lineTo.y);
        this.graphics.stroke();
    }

    /**
    描画した内容を削除
    */
    clearGraphics() {
        this.graphics.clear();
    }

    /**
    画面タッチ位置をキャンバス座標系に変換
    @param touchLocation 画面タッチ位置
    */
    screenToCanvasPoint(touchLocation: Vec2) {
        let eventPointV3 = v3(touchLocation.x, touchLocation.y, 0);
        // ビューポート（スマホ画面やブラウザの表示領域）座標をワールド座標に変換
        let worldPosV3 = this.camera.screenToWorld(eventPointV3);
        // ワールド座標をキャンバス上の座標に変換
        let canvasPosV3 = this.canvasUIT.convertToNodeSpaceAR(worldPosV3);
        let canvasPosV2 = v2(canvasPosV3.x, canvasPosV3.y);
        return canvasPosV2;
    }

    /**
    スワイプベクトルを更新
    @param touchLocation 画面タッチ位置
    */
    updateSwipeVec(touchLocation: Vec2) {
        let vx = touchLocation.x - this.controllerLineStart.x;
        let vy = touchLocation.y - this.controllerLineStart.y;
        this.swipeVecBase = v2(vx, vy);
        this.swipeVec = v2(vx * this.swipeScale, vy * this.swipeScale);
    }

    /**
    スワイプベクトルをリセット
    */
    resetSwipeVec() {
        this.swipeVec = v2(0, 0);
    }


    onLoad() {
        let canvasNode = this.node.parent;
        this.canvasUIT = canvasNode.getComponent(UITransform);
        this.graphics = this.node.getComponent(Graphics);
        let camera: Node = find('Camera', canvasNode);
        this.camera = camera.getComponent(Camera);
        
        // タッチコントローラーのサイズををキャンバスに合わせる
        let uit = this.getComponent(UITransform);
        uit.contentSize = this.canvasUIT.contentSize;

        canvasNode.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            // タッチ、スワイプ開始
            let location = this.screenToCanvasPoint(event.touch.getLocation());
            this.resetLatestLocation(location);
            this.swiping = true;
            this.resetSwipeVec();
        }, this);
        canvasNode.on(Node.EventType.TOUCH_MOVE, (event: EventTouch) => {
            // スワイプ中
            let location = this.screenToCanvasPoint(event.touch.getLocation());
            this.updateSwipeVec(location);
            this.drawSwipeLine();
        }, this);
        canvasNode.on(Node.EventType.TOUCH_END, (e: EventTouch) => {
            // スワイプ終了
            this.swiping = false;
            this.resetSwipeVec();
            this.clearGraphics();
        }, this);
        canvasNode.on(Node.EventType.TOUCH_CANCEL, (e: EventTouch) => {
            // スワイプキャンセル
            this.swiping = false;
            this.resetSwipeVec();
            this.clearGraphics();
        }, this);
    }

    start() {
    }

    update() {
    }
}


