import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useTheme } from '@shopify/restyle'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { Theme } from '../Theme/theme'

interface IProps {
    children?: any;
    // ref: React.MutableRefObject<BottomSheetModalMethods>;
    snapPoints?: Array<string>;
    onClose: () => void;
}

const ModalWrapper = React.forwardRef<BottomSheetModalMethods, IProps>(({ children, onClose, snapPoints = ['80%'] }, ref) => {
    const [index, setIndex] = React.useState(0);
    const theme = useTheme<Theme>();
    const renderBackdrop = React.useCallback(
        (        props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
      );

      const handleSheetChanges = React.useCallback((index: number) => {
        setIndex(index)
      }, []);
 
  return (
    <BottomSheetModalProvider>
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            onDismiss={() => onClose()}
            style={{...Style.parent }}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: theme.colors.white }}
            handleIndicatorStyle={{ width: 100, backgroundColor: 'lightgrey' }}
        >
            <BottomSheetScrollView scrollEnabled horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {children}
            </BottomSheetScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  )
})

export default ModalWrapper

export const Style = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 20,
    zIndex: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 200,
  },
  writeupContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ff886038',
    borderRadius: 10,
    marginTop: 20,
  },
  iconContainer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addressCointainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
  },
  qrContainer: {
    width: '100%',
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  }
});
