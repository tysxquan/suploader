/* 
 *	封装UI,上传处理操作采用WebUploader,图片预览PhotoSwipe（此为演示版）
 * 
 * @author Mr.sxquan
 * @since 2020-05-01
 */
(function($) {
	var leftIcon = '<svg t="1588343785616" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20008" width="200" height="200"><path d="M670.8 223.4c16.3 16.3 16.3 43.1 0 59.4L441.1 512.5l229.8 229.8c16.3 16.3 16.3 43.1 0 59.4-16.3 16.3-43.1 16.3-59.4 0L352 542.2c-16.3-16.3-16.3-43.1 0-59.4l259.4-259.4c16.4-16.4 43.1-16.4 59.4 0z" p-id="20009"></path></svg>',
		cancelIcon = '<svg t="1588342599244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11384" width="200" height="200"><path d="M511.4 778.7c-136.5 0-269.2-80.6-394.6-239.8l-13.1-16.7 11.4-17.9c1.6-2.6 40.5-63.4 107.1-125.5 39.4-36.8 80.5-66.4 122.1-88.1 53.1-27.7 107.1-42.4 160.6-43.9 140.4-3.8 274.3 82.4 398 256.2l11.8 16.6-11.1 17.1c-1.5 2.4-38.3 58.5-102.3 116.3-37.8 34.2-77.5 61.9-117.8 82.4-51.3 26.1-103.9 40.5-156.2 42.9-5.3 0.3-10.6 0.4-15.9 0.4zM177.8 519.1C291 656.6 407.4 723.6 524.3 718.4c99.5-4.4 183.1-61.6 235.6-108.8 38.6-34.7 66.8-69.3 81.6-89-107.6-144.9-220.2-216.8-334.8-213.8-101 2.6-187.6 63.9-242.5 114.9-40.9 37.9-70.8 76-86.4 97.4z" p-id="11385"></path><path d="M509.5 641.6c-70.6 0-128.1-57.5-128.1-128.1s57.5-128.1 128.1-128.1 128.1 57.5 128.1 128.1-57.5 128.1-128.1 128.1z m0-196.2c-37.6 0-68.1 30.5-68.1 68.1 0 37.6 30.5 68.1 68.1 68.1s68.1-30.5 68.1-68.1c0-37.6-30.5-68.1-68.1-68.1z" p-id="11386"></path></svg>',
		rightIcon = '<svg t="1588343816281" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20145" width="200" height="200"><path d="M352 223.4c-16.3 16.3-16.3 43.1 0 59.4l229.8 229.8L352 742.3c-16.3 16.3-16.3 43.1 0 59.4 16.3 16.3 43.1 16.3 59.4 0l259.5-259.5c16.3-16.3 16.3-43.1 0-59.4L411.4 223.4c-16.4-16.4-43.1-16.4-59.4 0z" p-id="20146"></path></svg>',
		uploadBtn = '<svg t="1588341694220" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6869" width="200" height="200"><path d="M930.133 465.067H554.667V89.6c0-19.115-15.019-34.133-34.134-34.133S486.4 70.485 486.4 89.6v375.467H110.933c-19.114 0-34.133 15.018-34.133 34.133s15.019 34.133 34.133 34.133H486.4V908.8c0 19.115 15.019 34.133 34.133 34.133s34.134-15.018 34.134-34.133V533.333h375.466c19.115 0 34.134-15.018 34.134-34.133s-15.019-34.133-34.134-34.133z" p-id="6870"></path></svg>',
		closeIcon = '<svg t="1588343926585" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21035" width="200" height="200"><path d="M760.96 195.2L512 444.16 263.04 195.2a48 48 0 0 0-67.84 67.84L444.16 512l-248.96 248.96A48 48 0 0 0 263.04 832L512 579.84 760.96 832A48 48 0 0 0 832 760.96L579.84 512 832 263.04a48 48 0 0 0-67.84-67.84z" p-id="21036"></path></svg>',
		CLS_UL = "upload-ul",
		CLS_VIEW = "supl-view",
		CLS_BAR = "supl-bar",
		CLS_BTN_DEL = "supl-btn-del",
		CLS_BTN_LEFT = "supl-btn-left",
		CLS_BTN_CANCEL ="supl-btn-cancel",
		CLS_BTN_RIGHT = "supl-btn-right";
	$.fn.extend({
		/*
		 *	上传方法 opt为参数配置;
		 *	serverCallBack回调函数 每个文件上传至服务端后,服务端返回参数,无论成功失败都会调用 参数为服务器返回信息;
		 */
		supload:function(opt, serverCallBack) {
			if (typeof opt != "object") {
				alert('参数错误!');
				return;
			}
			 
			 
			if (opt.pick) {
				if(opt.pick.label){
					opt.pick.label = uploadBtn + '<div style="margin-top: 8px;font-size: 12px;text-align: center;">' + opt.pick.label + '</div>';
				}
			}
			//获取默认配置
			let config = getConfig();
			$.extend(true, config, opt);

			let $fileInput = $(this);
			config.pick.id = $fileInput;

			//组装参数;
			if (config.success) {
				var successCallBack = config.success;
				delete config.success;
			}

			if (config.error) {
				var errorCallBack = config.error;
				delete config.error;
			}


			let webUploader = getUploader(config);

			if (!WebUploader.Uploader.support()) {
				alert(' 上传组件不支持您的浏览器！');
				return false;
			}


			//绑定文件加入队列事件;
			webUploader.on('fileQueued', function(file) {
				createBox($fileInput, file, webUploader, config);
			});
			//进度条事件
			webUploader.on('uploadProgress', function(file, percentage) {
				var $fileBox = $('#' + file.id);
				var $bar = $fileBox.find('.'+CLS_BAR);
				$bar.css("display", "flex");
			});

			//全部上传结束后触发;
			webUploader.on('uploadFinished', function() {
				
			});
			
			//绑定发送至服务端返回后触发事件;
			webUploader.on('uploadAccept', function(object, data) {
				if (serverCallBack) serverCallBack(data);
			});

			//上传成功后触发事件;
			webUploader.on('uploadSuccess', function(file, response) {
				let $fileBox = $('#' + file.id),
					$bar = $fileBox.find('.'+CLS_BAR),
					data = response.data;
				if (response[config.resCodeName] === config.resSuccessCode) {
					//淡出加载效果
					$bar.fadeOut(800);
					file.name = data.imageName;
					//显示图标
					$fileBox.find('.'+CLS_VIEW).append('<img src="' + data.url + '" >');
					if (successCallBack) {
						successCallBack(response);
					}
				} else {
					alert(response.message);
					$fileBox.fadeOut(2000, function() {
						webUploader.removeFile(file.id, true);
					});
				}

			});

			//上传失败后触发事件
			webUploader.on('uploadError', function(file, reason) {
				let $fileBox = $('#' + file.id);
				let $bar = $fileBox.find('.'+CLS_BAR);
				$bar.find('i').css("color", "red");
				alert("上传失败，错误信息: " + reason);
				$fileBox.fadeOut(2000, function() {
					webUploader.removeFile(file.id, true);
				});
				let err = {
					code: reason,
					name: file.name
				};
				if (errorCallBack) {
					errorCallBack(err);
				}
			});


			//当文件被移除队列后触发。
			webUploader.on("fileDequeued", function(file) {
				config.pick.id.fadeIn(500);
				//刷新按否则按钮无效
				webUploader.refresh();
			});

			//选择文件错误触发事件;
			webUploader.on('error', function(code) {
				let messages = '';
				switch (code) {
					case 'F_DUPLICATE':
						messages = '该文件已经被选择了!';
						break;
					case 'Q_EXCEED_NUM_LIMIT':
						messages = '上传文件数量超过限制!';
						break;
					case 'F_EXCEED_SIZE':
						messages = '文件大小超过限制!';
						break;
					case 'Q_EXCEED_SIZE_LIMIT':
						messages = '所有文件总大小超过限制!';
						break;
					case 'Q_TYPE_DENIED':
						messages = '文件类型不正确或者是空文件!';
						break;
					default:
						messages = '未知错误!';
						break;
				}
				alert(messages);
			});

			//初始化图片注意加载顺序
			if (config.initFileUrl !== "") {
				let files = initImg(config.initFileUrl);
				webUploader.addFiles(files);
				layui.each(webUploader.getFiles('complete'), function(index, file) {
					let $fileBox = $('#' + file.id);
					$fileBox.find('.'+CLS_VIEW).append('<img src="' + file.source.url + '" >');
				});
			}
			return webUploader;
		}
	});

	/**
	 * 获取默认配置
	 */
	function getConfig() {
		return {
			//按钮容器;
			pick: {
				//默认不允许多文件上传
				multiple: false,
				label: uploadBtn,
			},
			//开启即刻上传
			auto: true,
			//类型限制;
			accept: {
				title: "Images",
				extensions: "gif,jpg,jpeg,bmp,png",
				mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp'
			},
			// 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
			disableGlobalDnd: true,
			//文件上传方式
			method: "POST",
			//上传前不压缩！
			compress: false,
			//上传并发数。允许同时最大上传进程数
			threads: 2,
			// 不压缩！
			resize: false,
			//上传服务器地址;
			server: "",
			//是否已二进制的流的方式发送文件，这样整个上传内容php://input都为文件内容
			sendAsBinary: false,
			// 开起分片上传。 thinkphp的上传类测试分片无效,图片丢失;
			// chunked:true,
			// 分片大小
			// chunkSize:512 * 1024,
			//最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
			fileNumLimit: 10,
			fileSizeLimit: 100000 * 1024,
			//默认限制上传大小10M
			fileSingleSizeLimit: 10000 * 1024,
			// -----  以下为自定义参数 --------
			// 初始化图片地址
			initFileUrl: "",
			// 删除请求服务器地址
			delServer:"",
			// 删除图片请求类型 默认get
			delType:"GET",
			// 删除图片属性域的name
			imageName:"imageName",
			// 返回状态码变量名 默认code
			resCodeName:"code",
			// 返回成功状态码 默认200
			resSuccessCode:200,
		}
	}

	//实例化Web Uploader
	function getUploader(opt) {
		return new WebUploader.Uploader(opt);
	}


	/**
	 * 初始化图片
	 * @param imageUrls 图片链接（数组形式）
	 */
	function initImg(imageUrls) {
		if (imageUrls === undefined || imageUrls === "") {
			return;
		}
		let files = [];
		if ($.isArray(imageUrls)) {
			layui.each(imageUrls, function(index, item) {
				addFile(files, item);
			});
		} else {
			addFile(files, imageUrls);
		}
		return files;
	}

	/**
	 * 模仿添加文件
	 * @param files 文件数组
	 * @param imageUrls 传入内容
	 */
	function addFile(files, imageUrls) {
		let obj = {};
		obj.name = imageUrls.substring(imageUrls.lastIndexOf("/") + 1);
		obj.lastModifiedDate = new Date();
		obj.url = imageUrls;
		obj.size = 1024;
		let file = new WebUploader.File(obj);
		file.setStatus('complete');
		files.push(file);
	}

	/**
	 * 加载photoSwip以及初始化
	 * @param items 需要预览的图片集
	 * @param index 默认打开第几张
	 */
	function openPhotoSwipe(items, index) {
		initPhotoSwipeHtml();
		var pswpElement = document.querySelectorAll('.pswp')[0];

		var options = {
			index: index,
			bgOpacity: 0.8,
		};

		var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
		gallery.listen('close', function() {
			pswpElement.remove()
		});
	};
	
	


	//取消事件;
	function removeLi($li, file_id, webUploader) {
		webUploader.removeFile(file_id, true);
		$li.remove();
	}


	//创建文件操作div;
	function createBox($fileInput, file, webUploader, config) {
		var file_id = file.id,
			$parentFileBox = $fileInput.parent().find("." + CLS_UL),
			liLength = $parentFileBox.find('li').length;

		//达到最大队列数移除上传按钮
		if (config.fileNumLimit === 1) {
			config.pick.id.hide();
		} else if (config.fileNumLimit === liLength + 1) {
			config.pick.id.fadeOut(800);
		}
		//设置排序字段
		file.sort = Number(liLength + 100);

		//添加子容器;
		let li = '<li id="' + file_id +'" > \
					<div class="supl-view">\
					    <input type="hidden">\
					    <div class="supl-bar"> \
						<span class="supl-loading"></span>\
					    </div> \
						<div class="supl-control">\
						<span class="supl-btn-del">'+closeIcon+'</span>\
						<div class="supl-control-bottom"><span class="supl-btn-left">'+leftIcon+'</span><span class="supl-btn-cancel">'+cancelIcon+'</span><span class="supl-btn-right">'+rightIcon+'</span></div>\
						</div>\
					</div> \
				</li>';

		$parentFileBox.append(li);

		let $fileBox = $parentFileBox.find('#' + file_id);

		//绑定取消事件;
		let $btnDel = $fileBox.find('.'+CLS_BTN_DEL).on('click', function() {
			let imageName = webUploader.getFile(file_id).name;
			 //todo 演示不做远程删除
			if(confirm("是否确定删除该图片")) {
				$fileBox.fadeOut(1000, function() {
					removeLi($fileBox, file, webUploader);
				});	
			}
			
			
		});
		if (config.fileNumLimit === 1) {
			$parentFileBox.find("."+CLS_BTN_LEFT).remove();
			$parentFileBox.find("."+CLS_BTN_RIGHT).remove();
		}

		//文件队列排序
		function sortNumber() {
			webUploader.sort(function(obj1, obj2) {
				return Number(obj1.sort - obj2.sort);
			});

		}

		//绑定左移事件;
		$fileBox.find('.'+CLS_BTN_LEFT).on('click', function() {
			var $fileBoxPrev = $fileBox.prev();
			if ($fileBoxPrev.length > 0) {
				$fileBox.insertBefore($fileBoxPrev);
				var this_file = webUploader.getFile(file_id),
					prev_file = webUploader.getFile($fileBoxPrev.attr("id"));
				this_file.sort = Number(this_file.sort - 1);
				prev_file.sort = Number(prev_file.sort + 1);
				//更新排序
				sortNumber();
			}
		});
		//绑定右移事件;
		$fileBox.find('.'+CLS_BTN_RIGHT).on('click', function() {
			var $fileBoxNext = $fileBox.next();
			if ($fileBoxNext.length > 0) {
				$fileBox.insertAfter($fileBoxNext);
				var this_file = webUploader.getFile(file_id),
					next_file = webUploader.getFile($fileBoxNext.attr("id"));
				this_file.sort = Number(this_file.sort + 1);
				next_file.sort = Number(next_file.sort - 1);
				sortNumber();
			}

		});
		 //todo 用于演示生成预览缩略图
		webUploader.makeThumb( file, function( error, dataSrc ) {
			if ( !error ) {
				$fileBox.find('.'+CLS_VIEW).append('<img src="'+dataSrc+'" >');
			}
		});

		//绑定查看预览图事件;
		$fileBox.find("."+CLS_BTN_CANCEL).on('click', function() {
			var items = [];
			$parentFileBox.find("li img").each( function(i, t) {
				var item = {
					src: t.src,
					w: t.naturalWidth,
					h: t.naturalHeight
				};
				items.push(item)
			});
			//获取当前位置
			openPhotoSwipe(items, $fileBox.index());
		});

		if (file.type.split("/")[0] !== 'image') {
			var liClassName = getFileTypeClassName(file.name.split(".").pop());
			$fileBox.addClass(liClassName);
			return;
		}
	}

	//获取文件类型;
	function getFileTypeClassName(type) {
		var fileType = {};
		var suffix = '_bg';
		fileType['pdf'] = 'pdf';
		fileType['ppt'] = 'ppt';
		fileType['doc'] = 'doc';
		fileType['docx'] = 'doc';
		fileType['jpg'] = 'jpg';
		fileType['zip'] = 'zip';
		fileType['rar'] = 'rar';
		fileType['xls'] = 'xls';
		fileType['xlsx'] = 'xls';
		fileType['txt'] = 'txt';
		fileType = fileType[type] || 'ppt';
		return fileType + suffix;
	}

	function initPhotoSwipeHtml() {
		var html =
			'<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\
                          <div class="pswp__bg"></div>\
                        <div class="pswp__scroll-wrap">\
                    <div class="pswp__container">\
                    <div class="pswp__item"></div>\
                        <div class="pswp__item"></div>\
                        <div class="pswp__item"></div>\
                        </div>\
                        <div class="pswp__ui pswp__ui--hidden">\
                        <div class="pswp__top-bar">\
                    <div class="pswp__counter"></div>\
                        <button class="pswp__button pswp__button--close" title="关闭"></button>\
                        <button class="pswp__button pswp__button--fs" title="全屏"></button>\
                        <button class="pswp__button pswp__button--zoom" title="放大/缩小"></button>\
                        <div class="pswp__preloader">\
                        <div class="pswp__preloader__icn">\
                        <div class="pswp__preloader__cut">\
                        <div class="pswp__preloader__donut"></div>\
                        </div>\
                        </div>\
                        </div>\
                        </div>\
                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
                        <div class="pswp__share-tooltip"></div> \
                        </div>\
                        <button class="pswp__button pswp__button--arrow--left" title="上一张">\
                        </button>\
                        <button class="pswp__button pswp__button--arrow--right" title=下一张">\
                        </button>\
                        <div class="pswp__caption">\
                        <div class="pswp__caption__center"></div>\
                        </div>\
                        </div>\
                        </div>';
		$('body').append(html);
	}

})(jQuery);
