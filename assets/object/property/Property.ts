import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
* ゲーム内定数項目管理オブジェクト
*/
@ccclass('Property')
export class Property extends Component {

    tagMap: Map<string, number> = null;

    start() {
        // は全てここで定義する
        this.tagMap = new Map<string, number>();
        this.tagMap.set('NONE', 0);
        this.tagMap.set('BULLET', 10);
    }

    /**
     * タグ取得
     * 
     * @param key タグキー名
     */
    getTag(key: string): number {
        return this.tagMap.get(key);
    }

}


