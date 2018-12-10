# Introduction


## Quickstart

http://weex.apache.org/cn/guide/

https://github.com/weexteam/weex-pack

https://github.com/alibaba/weex-ui

https://alibaba.github.io/weex-ui/#/cn/

http://weex-project.io/examples.html

https://github.com/joggerplus/awesome-weex

#### web端开发：

$ npm install -g weex-toolkit

$ yarn

$ npm start

浏览器中打开http://192.168.1.7:8081/web/preview.html?page=index.js

#### 移动端开发：

安装jdk-8u181-windows-x64.exe

安装androidSDK：installer_r24.4.1-windows.exe

控制面板-程序-去除hyper-v

安装haxm-windows_v7_3_0.zip

启动AVD安卓模拟器

$ weex platform add android

$ weex run android

#### 移动端开发-ios：

安装xcode

xcode-Preferences-Locations-CommandLineTools-xcode

$ weex platform add ios

$ weex run ios

#### 移动端发布

$ npm run pack:android

keytool -genkey -alias hitb.keystore -keyalg RSA -validity 1000 -keystore hitb.keystore

keytool -list -v -keystore .\hitb.keystore

jarsigner -verbose -keystore hitb.keystore   -tsa http://sha256timestamp.ws.symantec.com/sha256/timestamp  -signedjar clipalm.apk app-release-unsigned.apk hitb.keystore

#### 修改App名称

C:\git\clipalm\platforms\android\app\src\main\res\values-zh-rCN\strings.xml:

   <resources>
   <string name="app_name">WEEX APP</string>

C:\git\clipalm\platforms\android\app\src\main\res\values\strings.xml:
    <resources>
    <string name="app_name">WEEX APP</string>
    <string name="dummy_content">Hello WEEX</string>

#### bindX

https://alibaba.github.io/bindingx/

https://github.com/alibaba/bindingx#installation

https://searchcode.com/

C:\Users\hitb\Documents\GitHub\clipalm\platforms\android\app\build.gradle

    // compile 'com.taobao.android:weexplugin-loader:1.3'
    // compile 'com.taobao.android:weexplugin-processor:1.3'
    // compile 'com.taobao.android:weexplugin-annotation:1.3'
    implementation 'com.alibaba.android:bindingx-core:1.0.1'
    implementation 'com.alibaba.android:bindingx_weex_plugin:1.0.1'


C:\Users\hitb\Documents\GitHub\clipalm\platforms\android\app\src\main\java\com\weex\app\WXApplication.java

    // import com.alibaba.weex.plugin.loader.WeexPluginContainer;
    import com.alibaba.android.bindingx.plugin.weex.BindingX;

    try {
      BindingX.register();
    } catch (WXException e) {
      e.printStackTrace();
    }
    // WeexPluginContainer.loadAll(this);

C:\Users\hitb\Documents\GitHub\clipalm\platforms\android\app\src\main\AndroidManifest.xml 中加入

    <uses-sdk tools:overrideLibrary="com.alibaba.android.bindingx.core, com.alibaba.android.bindingx.plugin.weex"/>


Multiple dex files define（jar包冲突）

  com/alibaba/weex/plugin/annotation/WeexAdapter

  Program type already present: com.alibaba.weex.plugin.annotation.WeexAdapter

#### 参考
  [hminghe/weex-amui](https://github.com/hminghe/weex-amui/)
