//
//  Hoge.m
//  bar
//
//  Created by Scott on 2020/12/19.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "Hoge.h"

@implementation Hoge
{
  bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  // Set up any upstream listeners or background tasks as necessary
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(OnNotify:) name:@"Notify" object:nil];
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
  // Remove upstream listeners, stop unnecessary background tasks
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"NotificationFromiOS"];
}

-(void)OnNotify:(NSNotification *) notification
{
  //dispatch_async(dispatch_get_main_queue(), ^{
  NSLog(@"OnNotify");
  NSString *message = [[notification userInfo] objectForKey:@"Message"];
  NSLog(@"OnNotify: %@", message);
  
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"NotificationFromiOS" body:@{@"message": [NSString stringWithFormat:@"Hello, you sent me '%@'", message]}];
  }
  //});
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getOSInfo:(RCTResponseSenderBlock)callback) {
  // return retun value as an array
  callback(@[@"iOS", [UIDevice currentDevice].systemVersion]);
}

RCT_EXPORT_METHOD(notify:(NSString*)message) {
  NSDictionary *dict = [NSDictionary dictionaryWithObject:message forKey:@"Message"];
  NSNotification *notification =
  [NSNotification notificationWithName:@"Notify" object:self userInfo:dict];
  [[NSNotificationCenter defaultCenter] postNotification:notification];
}


@end
