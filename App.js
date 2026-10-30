import { ArrangementView, Host, VStack, Text as SwiftText } from "@expo/ui/swift-ui";
import {
  arrangementViewStyle,
  background,
  frame,
  layoutPriority,
  onGeometryChange,
  splitArrangementFixedLayoutSize,
} from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";
import { View, Text, Button } from "react-native";

const fill = frame({ maxWidth: Infinity, maxHeight: Infinity });

export default function App() {
  const [preferContent, setPreferContent] = useState(true);
  const [primaryHeight, setPrimaryHeight] = useState(0);
  const [secondaryHeight, setSecondaryHeight] = useState(0);
  return (
    <View style={{ flex: 1, paddingTop: 64, alignItems: "center", backgroundColor: "white" }}>
      <Text style={{ fontSize: 18 }}>ArrangementView slot sizing</Text>
      <Text>@expo/ui 58.0.25</Text>
      <Button
        title={preferContent ? "Traits ON" : "Traits OFF"}
        onPress={() => setPreferContent(!preferContent)}
      />
      <Text>
        Primary: {primaryHeight.toFixed(0)}; secondary: {secondaryHeight.toFixed(0)}
      </Text>
      <Text>Container 360; answer content 248</Text>
      <Host style={{ width: 350, height: 360 }} ignoreSafeArea="all">
        <ArrangementView modifiers={[arrangementViewStyle("split", { axes: "vertical" }), fill]}>
          <ArrangementView.Primary>
            <VStack
              modifiers={[
                fill,
                background("#b9d9ff"),
                onGeometryChange(({ height }) => setPrimaryHeight(height)),
              ]}
            >
              <SwiftText>Primary: should use remaining height</SwiftText>
            </VStack>
          </ArrangementView.Primary>
          <ArrangementView.Secondary>
            <VStack
              spacing={8}
              modifiers={[
                frame({ maxWidth: Infinity }),
                ...(preferContent
                  ? [
                      splitArrangementFixedLayoutSize({ horizontal: false, vertical: true }),
                      layoutPriority(1),
                    ]
                  : []),
                background("#ffd8b9"),
                onGeometryChange(({ height }) => setSecondaryHeight(height)),
              ]}
            >
              {[1, 2, 3, 4].map((number) => (
                <SwiftText key={number} modifiers={[frame({ height: 56 })]}>
                  Answer {number}
                </SwiftText>
              ))}
            </VStack>
          </ArrangementView.Secondary>
        </ArrangementView>
      </Host>
      <Text style={{ backgroundColor: "#ee6666", width: 350, height: 36, textAlign: "center" }}>
        Footer outside the 360pt Host
      </Text>
    </View>
  );
}
